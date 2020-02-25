import {
  Rule,
  apply,
  url,
  template,
  move,
  forEach,
  FileEntry,
  chain,
  branchAndMerge,
  mergeWith,
  MergeStrategy,
  Tree,
  SchematicContext,
} from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';

import { SeedLazyModuleOptions } from './schema';
import { strings as stringUtils } from '@angular-devkit/core';


function setupOptions(options: SeedLazyModuleOptions, host: Tree): void {
  const workspace = getWorkspace(host);
  if (!options.project) {
    options.project = Object.keys(workspace.projects)[0];
  }
  const project = workspace.projects[options.project];

  if (options.path === undefined) {
    const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
    options.path = `/${project.root}/src/${projectDirName}`;
  }

  const parsedPath = parseName(options.path, options.name);
  options.name = parsedPath.name;
  options.path = parsedPath.path;

}

export default function (options: SeedLazyModuleOptions): Rule {

  return (host: Tree, context: SchematicContext) => {

    setupOptions(options, host);

    const templateSource = apply(url('./files'), [
      template({
        ...stringUtils,
        ...options,
      }),
      move(`${options.path}/${options.name}` || ''),
      // fix for https://github.com/angular/angular-cli/issues/11337
      forEach((fileEntry: FileEntry) => {
        if (host.exists(fileEntry.path)) {
          host.overwrite(fileEntry.path, fileEntry.content);
        }
        return fileEntry;
      }),
    ]);

    const rule = chain([
      branchAndMerge(chain([
        mergeWith(templateSource, MergeStrategy.Overwrite)
      ])),
    ]);

    return rule(host, context);
  }
}

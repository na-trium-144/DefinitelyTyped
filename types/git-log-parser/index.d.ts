// Type definitions for git-log-parser 1.2
// Project: https://github.com/bendrucker/git-log-parser
// Definitions by: Corbin Crutchley <https://github.com/crutchcorn>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node"/>

import {
    SpawnOptions,
    SpawnOptionsWithoutStdio,
} from 'child_process'

export function parse(
    config: object,
    options?:
        | SpawnOptionsWithoutStdio
        | SpawnOptions,
): NodeJS.ReadableStream

export const fields: {
    commit: {
        long: 'H'
        short: 'h'
    }
    tree: {
        long: 'T'
        short: 't'
    }
    author: {
        name: 'an'
        email: 'ae'
        date: {
            key: 'ai'
            type: Date
        }
    }
    committer: {
        name: 'cn'
        email: 'ce'
        date: {
            key: 'ci'
            type: Date
        }
    }
    subject: 's'
    body: 'b'
}

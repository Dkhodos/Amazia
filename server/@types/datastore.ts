import { Datastore } from '@google-cloud/datastore';

type g = typeof globalThis

export interface DSGlobal extends g{
    datastore: Datastore
}
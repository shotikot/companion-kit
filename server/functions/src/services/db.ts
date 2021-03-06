import { createLazy } from 'common/utils/lazy.light';
import * as Repositories from 'common/database/repositories';
import Collections from 'common/database/collections';
import { ServerFirestore } from 'common/database/repositories/dbProvider';
import admin from './admin';

const db = createLazy<ServerFirestore>(() => {
    const res = admin.firestore() as ServerFirestore;
    res.isClient = false;
    return res;
});

export default db;

const RepoFactory = {
    Users: createLazy(() => new Repositories.UserRepo(db.value)),
    Clients: createLazy(() => new Repositories.ClientRepo(db.value)),
    ClientCards: createLazy(() => new Repositories.ClientCardRepo(db.value)),
    Coaches: createLazy(() => new Repositories.CoachRepo(db.value)),
    Records: createLazy(() => new Repositories.RecordRepo(db.value)),
    Invites: createLazy(() => new Repositories.InvitesRepo(db.value)),
    ServiceJobs: createLazy(() => new Repositories.ServiceJobs(db.value)),
};

export const Repo = {
    get Users() { return RepoFactory.Users.value; },
    get Clients() { return RepoFactory.Clients.value; },
    get ClientCards() { return RepoFactory.ClientCards.value; },
    get Coaches() { return RepoFactory.Coaches.value; },
    get Records() { return RepoFactory.Records.value; },
    get Invites() { return RepoFactory.Invites.value; },
    get ServiceJobs() { return RepoFactory.ServiceJobs.value; },
};

export {
    Collections,
};

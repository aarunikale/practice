import { Permission } from "node-appwrite";
import { voteCollection, db } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
    await databases.createCollection(db, voteCollection, voteCollection, [
        Permission.read("any"),
        Permission.create("users"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("vote collection is created");

    await Promise.all([
        databases.createEnumAttribute(db, voteCollection, "type", ["question", "answer"], true),
        databases.createStringAttribute(db, voteCollection, "typeId", 50, true),
        databases.createEnumAttribute(db, voteCollection, "voteStatus", ["upvoted", "downvoted"], true),
        databases.createStringAttribute(db, voteCollection, "voteById", 50, true),
    ]);
    console.log("Vote Attributes created");
};
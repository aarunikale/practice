import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

export default async function getOrCreateDB() {
    try {
        await databases.get(db);
        console.log("Database Connected");
    } catch (error) {
        try {
            await databases.create(db, db);
            console.log("Database Created");
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection()
            ]);
            console.log("Collections Created");
            console.log("Database Connected");
        } catch (error) {
            console.log("Error creating Databases or Collections:", error);
        };
    };
    return databases;
};
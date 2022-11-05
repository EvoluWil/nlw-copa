/*
  Warnings:

  - You are about to drop the column `poolId` on the `paticipant` table. All the data in the column will be lost.
  - Added the required column `pollId` to the `paticipant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_paticipant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,
    CONSTRAINT "paticipant_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "poll" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "paticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_paticipant" ("id", "userId") SELECT "id", "userId" FROM "paticipant";
DROP TABLE "paticipant";
ALTER TABLE "new_paticipant" RENAME TO "paticipant";
CREATE UNIQUE INDEX "paticipant_userId_pollId_key" ON "paticipant"("userId", "pollId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

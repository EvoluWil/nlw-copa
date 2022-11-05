/*
  Warnings:

  - You are about to drop the `paticipant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `paticipantId` on the `guess` table. All the data in the column will be lost.
  - Added the required column `participantId` to the `guess` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "paticipant_userId_pollId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "paticipant";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,
    CONSTRAINT "participant_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "poll" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_guess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstTeamPoints" INTEGER NOT NULL,
    "secondTeamPoints" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    CONSTRAINT "guess_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "guess_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_guess" ("createdAt", "firstTeamPoints", "gameId", "id", "secondTeamPoints") SELECT "createdAt", "firstTeamPoints", "gameId", "id", "secondTeamPoints" FROM "guess";
DROP TABLE "guess";
ALTER TABLE "new_guess" RENAME TO "guess";
CREATE UNIQUE INDEX "guess_gameId_participantId_key" ON "guess"("gameId", "participantId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "participant_userId_pollId_key" ON "participant"("userId", "pollId");

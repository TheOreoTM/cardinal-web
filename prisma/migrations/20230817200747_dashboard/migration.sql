-- CreateTable
CREATE TABLE "Afk" (
    "id" SERIAL NOT NULL,
    "memberId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "afkMessage" TEXT NOT NULL,
    "afkNick" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Afk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ban" (
    "id" SERIAL NOT NULL,
    "memberId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "modlogId" INTEGER NOT NULL,

    CONSTRAINT "Ban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Command" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Command_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guild" (
    "guildId" TEXT NOT NULL,
    "sub" TEXT,
    "prefix" TEXT NOT NULL DEFAULT '>',
    "channelModlog" TEXT NOT NULL DEFAULT '0',
    "roleAdmin" TEXT NOT NULL DEFAULT '0',
    "roleModerator" TEXT NOT NULL DEFAULT '0',
    "roleMuted" TEXT NOT NULL DEFAULT '0',
    "roleStaff" TEXT NOT NULL DEFAULT '0',
    "roleTrainee" TEXT NOT NULL DEFAULT '0',

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("guildId")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "messageId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modlog" (
    "id" SERIAL NOT NULL,
    "staffId" TEXT NOT NULL,
    "staffName" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "memberName" TEXT NOT NULL,
    "reason" TEXT DEFAULT 'No reason',
    "type" TEXT NOT NULL,
    "length" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guildId" TEXT NOT NULL,

    CONSTRAINT "Modlog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modnick" (
    "id" SERIAL NOT NULL,
    "memberId" TEXT NOT NULL,
    "originalNickname" TEXT NOT NULL,
    "moderatedNickname" TEXT NOT NULL,
    "frozen" BOOLEAN NOT NULL DEFAULT false,
    "modlogId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guildId" TEXT NOT NULL,

    CONSTRAINT "Modnick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mute" (
    "id" SERIAL NOT NULL,
    "memberId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modlogId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Mute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warn" (
    "id" SERIAL NOT NULL,
    "memberId" TEXT NOT NULL,
    "warnUid" TEXT NOT NULL,
    "modlogId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Warn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Afk_memberId_guildId_key" ON "Afk"("memberId", "guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Guild_guildId_key" ON "Guild"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Modnick_memberId_key" ON "Modnick"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Modnick_memberId_guildId_key" ON "Modnick"("memberId", "guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Warn_warnUid_key" ON "Warn"("warnUid");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Ban" ADD CONSTRAINT "Ban_modlogId_fkey" FOREIGN KEY ("modlogId") REFERENCES "Modlog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modnick" ADD CONSTRAINT "Modnick_modlogId_fkey" FOREIGN KEY ("modlogId") REFERENCES "Modlog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mute" ADD CONSTRAINT "Mute_modlogId_fkey" FOREIGN KEY ("modlogId") REFERENCES "Modlog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warn" ADD CONSTRAINT "Warn_modlogId_fkey" FOREIGN KEY ("modlogId") REFERENCES "Modlog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

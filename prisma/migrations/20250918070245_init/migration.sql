-- CreateTable
CREATE TABLE "WorkflowRun" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prompt" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "ai_response" TEXT NOT NULL,
    "api_response" TEXT NOT NULL,
    "final_result" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

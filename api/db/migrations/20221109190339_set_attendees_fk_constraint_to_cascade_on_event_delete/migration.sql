ALTER TABLE "InterviewSchedulerEventAttendee" DROP CONSTRAINT "InterviewSchedulerEventAttendee_eventID_fkey",
ADD CONSTRAINT "InterviewSchedulerEventAttendee_eventID_fkey"
  FOREIGN KEY ("eventID")
  REFERENCES "InterviewSchedulerEvent"("id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

import ApplicantInformation from '../ApplicantInformation/applicantinformation';
import ApplicantTimeline from '../ApplicantInformation/applicantTimeline';
import ApplicantNotes from '../ApplicantInformation/notes';

const ApplicantDetail = () => {
  return (
    <div className="h-full bg-slate-100 p-8 ">
      <div className="flex flex-col items-center justify-between pb-8 md:flex-row">
        <div className="user w-full">
          <div className="flex w-full items-center gap-5">
            <img
              className="h-20 w-20 rounded-full"
              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
              alt=""
            />
            <div>
              <h1 className="text-2xl font-bold">Ricardo Cooper</h1>
              <p className="text-base font-semibold text-gray-500">
                Applied For{' '}
                <span className="text-gray-900">Frontend Developer</span> on
                August 5, 2022
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-3 pt-2 md:pt-0">
          <button className="rounded-lg border border-gray-300 bg-white p-2 text-base font-semibold text-gray-900">
            Disqualify
          </button>
          <button className="border-gray-30 rounded-lg border bg-blue-600 p-2 text-base font-semibold text-white">
            Advance to Offer
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-8 lg:grid-cols-3">
        <div className="col-span-2">
          <ApplicantInformation />
          <div className="pt-5">
            <ApplicantNotes />
          </div>
        </div>
        <div className="col-span-2 pt-5 lg:col-span-1 lg:pt-0">
          <ApplicantTimeline />
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetail;

import Good from '../../../public/good.png';
import Like from '../../../public/like.png';
import User from '../../../public/user.png';

function CandidateTimeline() {
  return (
    <>
      <div className="rounded-xl border bg-white p-5">
        <h2 className="pb-5 text-xl font-semibold">Timeline</h2>
        <div className="relative">
          <div className="absolute left-[23px] h-full w-0 border"></div>
          <div className="flex items-center justify-between py-4 pt-0">
            <div className="flex items-center gap-5">
              <img
                src={User}
                alt=""
                className="z-10 h-12 w-12 rounded-full border-[5px] border-white"
              />
              <p className="w-auto text-gray-500">
                Applied to{' '}
                <span className="font-medium text-gray-900">
                  Frontend Developer
                </span>
              </p>
            </div>
            <span className="font-normal text-gray-500">20 sep</span>
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-5">
              <img
                src={Like}
                alt=""
                className="z-10 h-12 w-12 rounded-full border-[5px] border-white bg-gray-300 "
              />
              <p className="w-auto text-gray-500">
                Applied to{' '}
                <span className="font-medium text-gray-900">
                  Frontend Developer
                </span>
              </p>
            </div>
            <span className="font-normal text-gray-500">20 sep</span>
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-5">
              <img
                src={Good}
                alt=""
                className="z-10 h-12 w-12 rounded-full border-[5px] border-white"
              />
              <p className="w-auto text-gray-500">
                Applied to{' '}
                <span className="font-medium text-gray-900">
                  Frontend Developer
                </span>
              </p>
            </div>
            <span className="font-normal text-gray-500">20 sep</span>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-5">
              <img
                src={Like}
                alt=""
                className="z-10 h-12 w-12 rounded-full border-[5px] border-white bg-gray-300 "
              />
              <p className="w-auto text-gray-500">
                Applied to{' '}
                <span className="font-medium text-gray-900">
                  Frontend Developer
                </span>
              </p>
            </div>
            <span className="font-normal text-gray-500">20 sep</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateTimeline;

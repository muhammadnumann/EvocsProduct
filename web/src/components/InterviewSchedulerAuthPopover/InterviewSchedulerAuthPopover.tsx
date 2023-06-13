import { FC, Fragment, HTMLAttributes, useContext, useState } from 'react';

import { Popover, Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { usePopper } from 'react-popper';
import { RequiredOAuth, ValidateAccessAndGetRequiredAuth } from 'types/graphql';

import { Link, Redirect, routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';
import { classNames } from 'src/utils/utils';

import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';
import AzureADLogoIcon from '../Icons/AzureADLogoIcon/AzureADLogoIcon';
import GoogleGLogoIcon from '../Icons/GoogleGLogoIcon/GoogleGLogoIcon';
import { InterviewSchedulerContext } from '../InterviewSchedulerEventsLayoutCell';
import Office365LoginButton from '../Office365LoginButton/Office365LoginButton';

type AuthProvider = {
  name: string;
  description: string;
  href: string;
  icon: FC;
};
const solutions: Partial<Record<keyof RequiredOAuth, AuthProvider>> = {
  google: {
    name: 'Google Workspace',
    description: 'Setup calendar and directory access',
    href: '##',
    icon: GoogleGLogoIcon,
  },
  azureAD: {
    name: 'Azure AD',
    description: 'Setup calendar and directory access',
    href: '##',
    icon: AzureADLogoIcon,
  },
  zoom: {
    name: 'Reports',
    description: 'Keep track of your growth',
    href: '##',
    icon: IconThree,
  },
};

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  );
}

type InterviewSchedulerAuthPopoverProps = {
  label: string;
  requiredAuthStrategies: ValidateAccessAndGetRequiredAuth['requiredOAuthForProduct'];
  configuredAuthStrategies: ValidateAccessAndGetRequiredAuth['requiredOAuthForProduct'];
} & HTMLAttributes<HTMLDivElement>;

const InterviewSchedulerAuthPopover: FC<InterviewSchedulerAuthPopoverProps> = ({
  label,
  requiredAuthStrategies,
  configuredAuthStrategies,
  className,
}) => {
  const { isAuthenticated, currentUser } = useAuth();
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
  });

  const enabledProviders: Record<keyof RequiredOAuth, AuthProvider> =
    Object.entries(solutions).reduce(
      (acc, [k, v]) => (requiredAuthStrategies[k] ? { ...acc, [k]: v } : acc),
      {} as Record<keyof RequiredOAuth, AuthProvider>
    );

  const { productID } = useContext(InterviewSchedulerContext);

  const AuthElement: FC<
    AuthProvider & HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>
  > = ({ name, href, children, className }) => {
    switch (name) {
      case 'Google Workspace':
        return (
          <GoogleLoginButton
            alreadyAuthed={configuredAuthStrategies.google}
            userID={currentUser.userID}
            productID={productID}
            className={className}
            scopes="https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/directory.readonly"
            successRefetchQueryName="FindInterviewSchedulerEventsLayoutQuery"
          >
            {children}
          </GoogleLoginButton>
        );
      case 'Azure AD':
        return (
          <Office365LoginButton
            alreadyAuthed={configuredAuthStrategies.azureAD}
            userID={currentUser.userID}
            productID={productID}
            className={className}
            successRefetchQueryName="FindInterviewSchedulerEventsLayoutQuery"
          >
            {children}
          </Office365LoginButton>
        );
      default:
        return (
          <Link to={href} className={className}>
            {children}
          </Link>
        );
    }
  };

  return !isAuthenticated ? (
    <Redirect to={routes.home()} />
  ) : (
    <Popover className={className ?? 'fixed top-16 max-w-sm px-4'}>
      {({ open }) => (
        <>
          <Popover.Button
            ref={setReferenceElement}
            className={`
          ${open ? '' : 'text-opacity-90'}
          focus-visble:ring-white group inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75
          `}
          >
            <span>{label}</span>
            <ChevronDownIcon
              className="ui-open:rotate-180 ui-open:transform ui-open:text-opacity-100 ml-2 h-5 w-5 text-sm text-indigo-200 text-opacity-70 transition duration-150 ease-in-out group-hover:text-opacity-80"
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className="mt-3 w-screen max-w-sm px-4 sm:px-0"
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="grid gap-8 bg-gray-50 p-7">
                  {Object.entries(enabledProviders).map(([provider, item]) => {
                    const alreadyConfigured =
                      configuredAuthStrategies[provider];

                    return (
                      <AuthElement
                        key={item.name}
                        className={classNames(
                          '-m-3 flex items-center gap-4 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-400 focus-visible:ring-opacity-50',
                          alreadyConfigured && 'opacity-25'
                        )}
                        {...item}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                          <item.icon aria-hidden="true" />
                        </div>
                        <div className="flex flex-col items-start">
                          <p className="text-left text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-left text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                        {alreadyConfigured && (
                          <CheckCircleIcon
                            aria-hidden="true"
                            className="h-5 w-5 shrink-0 justify-self-end fill-green-500"
                          />
                        )}
                      </AuthElement>
                    );
                  })}
                </div>
                {/* <div className="bg-gray-50 p-4">
                    <a
                      href="##"
                      className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-400 focus-visible:ring-opacity-50"
                    >
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          Documentation
                        </span>
                      </span>
                      <span className="block text-sm text-gray-500">
                        Start integrating products and tools
                      </span>
                    </a>
                  </div> */}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default InterviewSchedulerAuthPopover;

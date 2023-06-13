import { FC, useEffect, useState } from 'react';

import { Person } from '@buf/bufbuild_connect-web_evocs_commonschema/external/googleapidefs/people/v1/people_pb';
import { Combobox } from '@headlessui/react';
import {
  CheckIcon,
  ArrowsUpDownIcon as SelectorIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

import { normalizeAPIPeopleSearch } from 'src/utils/interviewscheduler/person';
import { FormAttendee } from 'src/utils/interviewscheduler/types';
import { classNames } from 'src/utils/utils';

import { useProductRunnerClient } from '../ProductRunnerContext/ProductRunnerContext';

export type SearchPeopleProps = {
  className: string;
  addAttendee: (p: FormAttendee) => void;
  attendees: FormAttendee[];
};
const SearchPeoplePicker: FC<SearchPeopleProps> = ({
  className,
  addAttendee,
  attendees,
}) => {
  const client = useProductRunnerClient();

  const [query, setQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<FormAttendee>();
  const [people, setPeople] = useState<FormAttendee[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<FormAttendee[]>([]);

  const reset = () => {
    setQuery('');
    setSelectedPerson(null);
    setPeople([]);
  };

  useEffect(() => {
    const timeoutID = setTimeout(async () => {
      if (!query || query === '') {
        reset();
        return;
      }

      const resp = await client.searchPeople({ query });
      setPeople(normalizeAPIPeopleSearch(resp));
    }, 100);
    return () => clearTimeout(timeoutID);
  }, [client, query]);

  useEffect(() => {
    const filtered = people.filter(
      (person) =>
        attendees.find((a) => a.attendeeURI === person.attendeeURI) == null
    );
    setFilteredPeople(filtered);
  }, [attendees, people]);

  useEffect(() => {
    if (selectedPerson) {
      addAttendee(selectedPerson);
      reset();
    }
  }, [selectedPerson, addAttendee, setSelectedPerson]);

  return (
    <Combobox
      as="div"
      value={selectedPerson}
      onChange={setSelectedPerson}
      className={className}
    >
      <div className="relative mt-1">
        <Combobox.Button as="div">
          <Combobox.Input
            spellCheck="false"
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(_person: Person) => selectedPerson?.name}
          />
        </Combobox.Button>
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredPeople.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person) => (
              <Combobox.Option
                key={person.attendeeURI}
                value={person}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      <div className="flex flex-row items-center">
                        {person.avatarURL ? (
                          <img
                            src={person.avatarURL}
                            alt=""
                            className="h-6 w-6 flex-shrink-0 rounded-full"
                          />
                        ) : (
                          <UserCircleIcon className="w-g h-6 flex-shrink-0 rounded-full" />
                        )}
                        <span
                          className={classNames(
                            'ml-3',
                            'truncate',
                            selected && 'font-semibold'
                          )}
                        >
                          {person.name ?? '--'}
                        </span>
                      </div>
                      <span
                        className={classNames(
                          'ml-2 truncate text-gray-500',
                          active ? 'text-indigo-200' : 'text-gray-500'
                        )}
                      >
                        {person.email}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default SearchPeoplePicker;

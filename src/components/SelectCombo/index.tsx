import { Fragment, ReactElement, useEffect, useState } from 'react'
import { Control, FieldValues } from 'react-hook-form'
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"


interface IProps {
    onChange?: (data: string) => void,
    items: { id: number, name: string, icon: ReactElement, selected: boolean }[]
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Index({ items, onChange }: IProps) {
    const [itemSelected, setItemSelected] = useState<{ id: number, name: string, icon: ReactElement, selected: boolean }>()

    const doChange = (data: { id: number, name: string, icon: ReactElement, selected: boolean }) => {
        setItemSelected(data);
        onChange && onChange(data.name.toLocaleLowerCase());
    }

    useEffect(() => {
        let one = items.find(e => e.selected === true);
        setItemSelected(one);
        onChange && onChange(one!.name.toLocaleLowerCase());
    }, []);

    return (
        < Listbox value={itemSelected} onChange={doChange} >
            {({ open }) => (
                <>
                    <div className="relative mt-2">
                        <Listbox.Button className="relative w-full cursor-pointer rounded bg-white py-1.5 pl-3 pr-10 text-left text-gray-700 shadow ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:leading-6">
                            {itemSelected && <span className="flex items-center">
                                {itemSelected?.icon}
                                <span className="ml-3 block truncate">{itemSelected.name}</span>
                            </span>}
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {items.map((item, index) => (
                                    <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'group bg-orange-500 text-white' : 'group  text-gray-700',
                                                'relative cursor-pointer select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    {item?.icon}
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                                                        {item.name}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-orange-500',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox >)
}

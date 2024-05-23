import { Fragment, ReactElement, ReactNode, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useAuth } from '../../hooks/Auth';

interface IGenericDialogInput {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    title: string,
    icon?: ReactElement,
    description?: string,
    actions?: { caption: string | ReactElement, fn: () => void }[],
    children?: ReactNode
}

export default function GenericDialog({ isOpen, setIsOpen, title, icon, description, actions, children }: IGenericDialogInput) {


    return (
        <Transition show={isOpen} as={Fragment} >
            <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
                </Transition.Child>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="flex flex-col justify-between items-center mx-auto p-2 max-w-md w-full h-56 rounded-md bg-gray-100 text-gray-600 ring-1 ring-gray-400">
                            {icon && <div className="mb-2">{icon}</div>}
                            <Dialog.Title className="text-center font-bold text-lg">
                                {title}
                            </Dialog.Title>
                            <Dialog.Description className="px-2">
                                {description}
                                {children}
                            </Dialog.Description>


                            <div className="flex flex-wrap-reverse gap-2 justify-center">
                                {actions?.map((e, index) => (
                                    <button key={index} className="text-white shadow-lg ring-1 ring-gray-200 bg-orange-600 hover:bg-orange-700 font-medium rounded text-sm px-5 py-1" onClick={() => e.fn()}>{e.caption}</button>
                                ))}
                                <button className="text-gray-800 shadow-lg ring-1 ring-gray-300 bg-gray-300 hover:bg-orange-500 hover:text-white font-medium rounded text-sm px-5 py-1" onClick={() => setIsOpen(false)}>Close</button>
                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CopyButton from '../CopyButton'
import { createLink } from '../../services';
import { useAuth } from '../../hooks/Auth';
import Spinner from '../Spinner';
import { gTag } from '../../firebase';

interface IShareDialogInput {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    epm: Number;
    campaignId: string;
}

export default function ShareDialog({ isOpen, setIsOpen, epm, campaignId }: IShareDialogInput) {

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState<string>();

    const { user } = useAuth();

    useEffect(() => {
        if (isOpen) {
            link || setLoading(true);
            link || createLink(campaignId)
                .then(res => {
                    setLink(res.data);
                    setLoading(false);
                    gTag('create_link', { campaignId: campaignId });
                })
                .catch((e) => { setError(e); console.log(e) });
        }
    }, [isOpen]);

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
                        <Dialog.Panel className="flex flex-col justify-between items-center mx-auto p-2 max-w-md w-full h-56 rounded-lg bg-gray-100 text-gray-600 ring-1 ring-gray-400">
                            <Dialog.Title className="text-center font-bold text-lg">Promote Link</Dialog.Title>
                            <Dialog.Description className="px-2">
                                Copy the link on social networks or any website, for every 1000 clicks you will get ${epm.toString()} USD.
                            </Dialog.Description>

                            <div className="relative w-full rounded-md shadow-sm ">
                                {loading ? <Spinner text="Generating link ..." /> : <>
                                    <input type="text" name="link" value={link!} disabled className="cursor-text block w-full rounded-md border-gray-400 bg-gray-300 px-2 text-sm h-8 text-gray-600" placeholder="Generating..." />
                                    <div className="absolute inset-y-0 right-0 flex items-center">
                                        <CopyButton text={link!} />
                                    </div>
                                </>}

                            </div>

                            <div className="flex justify-center">
                                <button className="text-gray-800 shadow-lg ring-1 ring-gray-300 bg-gray-300 hover:bg-orange-500 hover:text-white font-medium rounded text-sm px-5 py-1 outline-none cursor-default md:cursor-pointer" onClick={() => setIsOpen(false)}>Close</button>
                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}
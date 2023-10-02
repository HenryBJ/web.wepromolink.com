import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { joinWaitingList } from "../../services";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";

interface IData {
    email: string,
}
const schema = yup.object().shape({
    email: yup.string().email().required(),
});

export default function Index() {
    const [loading, setLoading] = useState<boolean>(false);


    const { register, handleSubmit, formState: { errors }, reset } = useForm<IData>({
        resolver: yupResolver(schema),
        reValidateMode: "onSubmit"
    });

    const handleErrorsDetected = () => {
        // Aquí puedes realizar acciones adicionales cuando se detecten errores
        console.log("Errores detectados en el formulario:", errors);
        // Por ejemplo, mostrar un mensaje de error personalizado o realizar otras acciones
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            handleErrorsDetected();
        }
    }, [errors]);

    const handEmojiAnimation = {
        initial: { x: 0, opacity: 0, rotateZ: 0, transformOrigin: "left center" },
        animate: { x: 0, opacity: 1, rotateZ: 45 },
    };

    const onSubmit = (data: IData) => {
        setLoading(true);
        joinWaitingList(data.email)
            .then(() => toast.success(' 🎉 You\'ve successfully joined the waiting list! Thank you for your interest! 🚀'))
            .catch(() => toast.error('Oops! Something went wrong while trying to join the waiting list. Please try again later. 😔'))
            .finally(() => {
                setLoading(false);
                reset();
            });
    }


    return <div className="w-full flex flex-col gap-4 justify-center items-center">
        <div className="text-orange-100 md:text-orange-800 font-semibold text-lg md:text-2xl w-4/5 text-center">
            🚧 We're building amazing promotion and advertising platform for you! <br />
            Our system is under development and will be available soon. Stay tuned for more updates! 📢
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="relative">
            {errors.email && (
                <motion.div
                    className="text-4xl w-fit -top-12 left-0 absolute h-fit"
                    variants={handEmojiAnimation}
                    initial="initial"
                    animate="animate"
                >
                    👉🏻
                </motion.div>
            )}
            <div className="w-full flex flex-col md:flex-row gap-4 justify-center items-center">
                <input className="shadow-lg appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register('email')} maxLength={160} placeholder="Email" type="text" />
                <button disabled={loading} type="submit" className="md:hover:bg-orange-700 max-w-xs w-52 h-9 inline-block md:bg-orange-500 md:text-white bg-white text-orange-500 font-sans font-bold text-center text-lg py-1 my-1 rounded-full shadow-xl hover:shadow-none active:bg-orange-500 active:text-white md:active:bg-white md:active:text-orange-500 md:active:ring-2 md:active:ring-orange-500 disabled:bg-white/90 disabled:hover:bg-white/90">
                    {loading ? <Spinner text="" /> : <span>Subscribe for Updates</span>}
                </button>
            </div>
        </form>
    </div>
}
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { boolean } from "yup";


interface IProps {
    isVisible: boolean,
    callback: () => void
}

const reloadIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>


export default function Index({ isVisible, callback }: IProps) {
    const [visible, setVisible] = useState<boolean>(false);
    const controls = useAnimation();

    const handleClick = () => {

        controls.start({
            scale: [1, 0.2],
            rotate: [360, 0],
        }, { duration: 1 }).then(() => { setVisible(false); callback(); });
    }

    useEffect(() => {
        setVisible(isVisible);
        if (isVisible) {
            controls.start({
                scale: [0.2, 1],
                rotate: [0, 360],
            });
        }
    }, [isVisible])

    return (
        <div className={visible ? '' : 'hidden'}>
            <motion.button
                className="fixed bottom-10 right-6 shadow-lg rounded-full w-10 h-10 bg-orange-500 text-white flex items-center justify-center"
                onClick={handleClick}
                initial={{ scale: 0.2, rotate: 0 }} // Estado inicial (tamaño más pequeño y sin rotación)
                animate={controls} // Estado animado (tamaño normal y rotación completa)
                transition={{ duration: 1 }} // Duración de la animación en segundos
            >
                {reloadIcon}
            </motion.button>
        </div>
    );

}

import { useEffect, useState } from "react";
import { addSurveyDatapoint, getSurvey } from "../../services";
import { ISurveySummary } from "../../interfaces/ViewModels";
import { motion } from "framer-motion";
import SocialNetworks from "../../components/SocialNetworks";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

export default function Index() {
    const [loading, setLoading] = useState(false);
    const [finish, setFinish] = useState(false);
    const [step, setStep] = useState(0);
    const [survey, setSurvey] = useState<ISurveySummary>();

    useEffect(() => {
        setLoading(true);
        getSurvey()
            .then(res => setSurvey(res.data))
            .catch(_ => toast.error('Loading survey failed'))
            .finally(() => setLoading(false))

    }, []);

    const handleClick = (question: string, answer: string) => {
        addSurveyDatapoint(question, answer).catch(_ => toast.error("Unable to send answer"));
        if (step + 1 == survey?.data.length) {
            setFinish(true);
        } else {
            setStep(prev => prev + 1);
        }
    }

    const ThumbUpAnimation = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <motion.div
                    className="text-8xl"
                    initial={{ opacity: 0, y: -100 }} // Posición inicial (arriba y transparente)
                    animate={{ opacity: 1, y: 0 }}    // Posición final (abajo y visible)
                    transition={{ duration: 1 }}      // Duración de la animación (1 segundo)
                >
                    👍
                </motion.div>
                <motion.div
                    className="mt-10 relative w-80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <p className="text-2xl text-white md:text-orange-500 w-full text-center">Follow us on social media</p>
                    <div className="flex justify-center absolute top-0 left-0">
                        <SocialNetworks alternative />
                    </div>
                </motion.div>
            </div>
        );
    };

    return (
        <section className="h-full w-full flex flex-col justify-center items-center">
            {!loading && !finish &&
                <div className="bg-white md:bg-white/70  h-[70vh] md:h-96  mx-4 md:mx-0 md:w-3/4 shadow-2xl rounded-xl flex flex-col justify-between py-5 relative">
                    {survey?.data && <span className="absolute top-0 right-0 bg-orange-500 text-xs font-medium text-white m-2 p-1 rounded-full">{`${step + 1}/${survey?.data.length}`}</span>}
                    <span className="text-center mt-4 ml-4 mr-4 text-2xl">{survey?.data[step].question}</span>
                    <div className="bg-white/50 p-2 mx-2 md:mx-10 rounded-md flex flex-col gap-3 md:gap-2">
                        {survey?.data[step].answers.map((e, index) => {
                            return (<button onClick={() => handleClick(survey?.data[step].id, e.id)} className="bg-orange-500 text-white md:text-black md:bg-white text-left p-2 rounded-lg md:hover:bg-orange-500 md:hover:text-white" key={index}>{e.response}</button>)
                        })}
                    </div>
                </div>
            }
            {finish && <ThumbUpAnimation />}
            {loading && <Spinner />}
        </section>
    )
}
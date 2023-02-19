import GenericForm, { FormItem } from "../../components/GenericForm";
import * as yup from "yup";

type CampaignInputs = {
    name: string,
    description: string
}

const schema = yup.object({
    name: yup.string().trim().required(),
    description: yup.string(),
}).required();


export default function Index() {

    const onSubmit = (data: CampaignInputs) => {
        alert(data.name);
    }

    return (
        <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-start items-center">

            <GenericForm schema={schema} title="Create Campaign" onSubmit={onSubmit} buttonTitle="Create" >
                <FormItem field="name">
                  {({register})=>(<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Name" type="text" {...register("name")} />)}
                </FormItem>

                <FormItem helpTip="Campaign description">
                    <div>Inputs here for description</div>
                </FormItem>

                <FormItem helpTip="EPM: Eran per Miles">
                    <div>Inputs here EPM</div>
                </FormItem>

                <FormItem helpTip="Campaign name">
                    <div>Inputs here</div>
                </FormItem>

            </GenericForm>
        </section>)
}
import { useState } from "react";
import { useForm } from "react-hook-form";
import { businessType, flowsDelivery, flowsMessaging, flowsSocialListening, replyRespond, replyRespondAndAttend } from "../data/business";
import { ItemObject } from "../interfaces/data";

export const FormBusiness = () => {
    const [flows, setFlows] = useState<Array<ItemObject>>([]);
    const [autoResponses, setAutoResponses] = useState<Array<ItemObject>>([]);
    const [showAutoReponse, setShowAutoResponse] = useState(false);
    const [submitted, setSubmitted] = useState<boolean>(false);


    const { register, handleSubmit, formState: { errors } } = useForm();

    const submit = (e: any) => {
        setSubmitted(true);
    }

    /**
     * Method start when change type business 
     * @param id id of type business
     */
    const changeSelectTypeBusiness = (name: string): void => {
        switch (name) {
            case 'Social Listening':
                setFlows(flowsSocialListening);
                break;
            case 'Mensajería':
                setFlows(flowsMessaging);
                break;
            default:
                setFlows(flowsDelivery);
        }
    }

    /**
     * Method start when change type flow
     * @param name name of flow
     */
    const changeSelectFlows = (name: string): void => {
        // Condition show auto response
        if (name && name !== 'Completo' && name !== 'Clasifica y responde') {
            setShowAutoResponse(true);
        } else {
            setShowAutoResponse(false);
        }

        // Responde y atiende
        switch (name) {
            case 'Responde y atiende':
                setAutoResponses(replyRespondAndAttend);
                break;
            case 'Responde':
                setAutoResponses(replyRespond);
                break;
            default:
                setAutoResponses([]);
        }
    }

    return (
        <div className="mt-3">
            <h3>Agrega tu empresa...</h3>
            <form onSubmit={handleSubmit(submit)}>
                <div className="row mt-5">
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label className="form-label">* Nombre de empresa</label>
                            <input id="email" type="text"
                                className="form-control" placeholder="Ingresa el nombre de la empresa..."
                                {...register("name", { required: true })} />
                            {
                                errors.name?.type === 'required' &&
                                <div className="form-text message-error">
                                    El campo nombre es obligatorio
                                </div>
                            }

                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label className="form-label">* Tipo de empresa</label>
                            <select {...register("selectTypeBusinnes", { required: true })} onChange={(event) => { changeSelectTypeBusiness(event.target.value) }} className="form-select" aria-label="select business type" >
                                <option value="" defaultValue="">Selecciona un tipo de empresa</option>
                                {
                                    businessType.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)
                                }
                            </select>
                            {
                                errors.selectTypeBusinnes?.type === 'required' &&
                                <div className="form-text message-error">
                                    Seleccione un tipo de empresa
                                </div>
                            }
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label className="form-label">* Flujo</label>
                            <select {...register("selectFlows", { required: true })} onChange={(event) => { changeSelectFlows(event.target.value) }} className="form-select" aria-label="select type flow">
                                <option value="" defaultValue="">Selecciona un tipo de flujo</option>
                                {
                                    flows.map((item: ItemObject) => <option key={item.name} value={item.name}>{item.name}</option>)
                                }
                            </select>
                            {
                                errors.selectFlows?.type === 'required' &&
                                <div className="form-text message-error">
                                    Seleccione un tipo de flujo
                                </div>
                            }
                        </div>
                    </div>
                    {
                        showAutoReponse && autoResponses.length > 0 && (
                            <div className="col-sm-6">
                                <div className="mb-3">
                                    <label className="form-label">* Auto respueta</label>
                                    <select {...register("selectResponseAuto", { required: true })} className="form-select" aria-label="select reponse auto">
                                        <option value="" defaultValue="">Selecciona una auto respuesta</option>
                                        {autoResponses.map((item: ItemObject) => <option key={item.name} value={item.name}>{item.name}</option>)}
                                    </select>
                                    {
                                        errors.selectResponseAuto?.type === 'required' &&
                                        <div className="form-text message-error">
                                            Seleccione una auto respuesta
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    }
                    <div className="col-sm-12 mt-3">
                        <button disabled={errors.length > 0} type="submit" className="btn btn-primary px-4 py-2">Enviar</button>
                    </div>
                </div>
            </form>

            {
                submitted && <div className="mt-5">
                    <h2>Datos ingresados correctamente....</h2>
                </div>
            }

        </div>
    )
}

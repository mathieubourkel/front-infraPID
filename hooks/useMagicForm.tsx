import { ReactNode, useState  } from "react";
import {  InputEvent, intRangeDate, intSafeSelect, intSelect, intSelects } from "../services/interfaces/generique.interface"
import { ValidationEnum } from "../services/enums/validation.enum";
import { ErrorsMessagesEnum } from "../services/enums/errors.messages.enum";
import { regexEmail, regexPwd } from "../services/schemas/regex.schema";

type Props = {
  form: any,
  handleSetForm:(data:any) => void;
  handleChange: (e:InputEvent) => void;
  handleSelect: (select:intSafeSelect, label:string) => void;
  handleMultiple: (arraySelect:intSelects, label:string, aliasLabel:string, aliasValue?:string) => void;
  handleDate: (select:intRangeDate, start:string, end?:string) => void;
  renderErrors: (name:string) => ReactNode
  validateForm: (schema:any[]) => boolean;
}

export const useMagicForm = ():Props =>{

  const [form, setForm] = useState<any>({})
  const [errors, setErrors] = useState<any>({})
  
  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelect = async (select: intSafeSelect, label:string, callback?:any) => {
    setForm({ ...form, [label]: select.value });
    if (callback) await callback()
  };

  const handleSetForm = (data:any) => {
    setForm(data);
  };

  const handleMultiple = (arraySelect:intSelects, label:string, aliasLabel:string, aliasValue?:string) => {
    const goodArray: any = arraySelect.map((select: intSelect) => ({[aliasValue || 'id']:select.value, [aliasLabel]: select.label}));
    setForm({ ...form, [label]: goodArray });
  }

  const handleDate = (select: intRangeDate, firstDate:string, range?:string) => {
    range ? setForm({ ...form, [firstDate]: select.startDate, [range]: select.endDate })
    : setForm({ ...form, [firstDate]: select.startDate})
  };

  const renderErrors = (name:string) => {
    if (errors[name]) return (
      errors[name].map((error:string, index:number) => (
        <div key={index}>
          <small className={"text-brick-400 font-bold flex-none"}>{error}</small>
        </div>
        ))
    )}

  const validateForm = (schema:any[]) => {
    const tmpErrors:any = {}
    schema.map((formInput:any) => {
        formInput.checks.map((check:any) => {
          switch (check) {
            case ValidationEnum.STRING:
              if (typeof form[formInput.name] !== 'string') tmpErrors[formInput.name] = (tmpErrors[formInput.name] || []).concat(ErrorsMessagesEnum.STRING)
              break;
            case ValidationEnum.STR_MAX:
              if (!formInput.options || !formInput.options.max) break;
              if (typeof form[formInput.name] !== 'string' || form[formInput.name].length > formInput.options.max) tmpErrors[formInput.name] = (tmpErrors[formInput.name] || []).concat(`${ErrorsMessagesEnum.STR_MAX}${formInput.options.max}`)
              break;
            case ValidationEnum.STR_MIN:
              if (!formInput.options || !formInput.options.min) break;
              if (typeof form[formInput.name] !== 'string' || form[formInput.name].length < formInput.options.min) tmpErrors[formInput.name] = (tmpErrors[formInput.name] || []).concat(`${ErrorsMessagesEnum.STR_MIN}${formInput.options.min}`)
              break;
            case ValidationEnum.STR_RANGE:
              if (!formInput.options || !formInput.options.min ||!formInput.options.max) break;
              if (typeof form[formInput.name] !== 'string' || form[formInput.name].length < formInput.options.min || form[formInput.name].length > formInput.options.max) tmpErrors[formInput.name] = (tmpErrors[formInput.name] || []).concat(`${ErrorsMessagesEnum.STR_RANGE}${formInput.options.min} et ${formInput.options.max}`)
              break;
            case ValidationEnum.REQUIRED:
              if (!form[formInput.name]) tmpErrors[formInput.name] = (tmpErrors[formInput.name] || []).concat(ErrorsMessagesEnum.REQUIRED)
              break;
            case ValidationEnum.NUMBER_INTEGER:
              if (!Number.isInteger(+form[formInput.name])) tmpErrors[formInput.name] = (tmpErrors[formInput.name] || []).concat(ErrorsMessagesEnum.NUMBER)
              break;
            case ValidationEnum.NB_MIN:
              if (!formInput.options || !formInput.options.min) break;
              if (typeof form[formInput.name] !== 'number' || form[formInput.name] < formInput.options.min) tmpErrors[formInput.name] = (tmpErrors[formInput.name] || []).concat(`${ErrorsMessagesEnum.NB_MIN}${formInput.options.min}`)
              break;
            case ValidationEnum.NB_MAX:
              if (!formInput.options || !formInput.options.max) break;
              if (typeof form[formInput.name] !== 'number' || form[formInput.name] > formInput.options.max) (tmpErrors[formInput.name] || []).concat(`${ErrorsMessagesEnum.NB_MAX}${formInput.options.min}`)
              break;
            case ValidationEnum.NB_RANGE:
              if (!formInput.options || !formInput.options.min ||!formInput.options.max) break;
              if (typeof form[formInput.name] === 'undefined' || +form[formInput.name] < formInput.options.min || +form[formInput.name] > formInput.options.max) tmpErrors[formInput.name] = (tmpErrors[formInput.name] || []).concat(`${ErrorsMessagesEnum.NB_RANGE}${formInput.options.min} et ${formInput.options.max}`)
              break;
            case ValidationEnum.SELECT:
              if (typeof form[formInput.name] === 'undefined') tmpErrors[formInput.name] = (tmpErrors[formInput.name] || []).concat(`${ErrorsMessagesEnum.SELECT}${formInput.name}`)
              break;
            case ValidationEnum.DATE:
              if (typeof form[formInput.name] === 'undefined' || isNaN(Date.parse(form[formInput.name]))) tmpErrors[formInput.name] = (tmpErrors[formInput.name] || []).concat(`${ErrorsMessagesEnum.DATE}`)
              break;
            case ValidationEnum.EMAIL:
              if (!regexEmail.test(form[formInput.name])) tmpErrors[formInput.name] = (tmpErrors[formInput.name] || []).concat(`${ErrorsMessagesEnum.EMAIL}`)
              break;
            case ValidationEnum.PASSWORD:
              if (!regexPwd.test(form[formInput.name])) tmpErrors[formInput.name] = (tmpErrors[formInput.name] || []).concat(`${ErrorsMessagesEnum.PASSWORD}`)
              break;
            case ValidationEnum.IS_IDENTIC:
              if (form[formInput.name]!== form[formInput.options.isIdentic]) tmpErrors[formInput.name] = (tmpErrors[formInput.name] || []).concat(`${ErrorsMessagesEnum.IS_IDENTIC}`)
              break;
          }
        })
      })
    setErrors(tmpErrors)
    if (Object.keys(tmpErrors).length !== 0) return false;
    return true;
  }

  return {form, handleSetForm, handleChange, handleSelect, handleMultiple, handleDate, renderErrors, validateForm}
}

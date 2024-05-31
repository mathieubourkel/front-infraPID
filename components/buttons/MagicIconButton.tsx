import { ButtonTypeEnum } from '@/services/enums/button.type';
import { faCheck, faCopy, faEye, faFilter, faFolderPlus, faPaperPlane, faPen, faRotateRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    type: ButtonTypeEnum,
    handleClick?: () => void;
    tooltip?:boolean
}

export default function MagicIconButton({type, handleClick, tooltip}:Props) {

let props:any = {icon: null, value:'', bg:null,
 border:null, text:null, type:"submit", onClick:null, variant:null, size:'sm', sizeIcon:'sm'}

if (handleClick) props = {...props, type:null, onClick:handleClick}

switch (type) {
    case ButtonTypeEnum.ADD:
        props = {...props, icon:faPaperPlane, value:'Ajouter'}
        break;
    case ButtonTypeEnum.CREATE:
        props = {...props, icon:faFolderPlus, value:'Créer'}
        break;
    case ButtonTypeEnum.FILTER:
        props = {...props, icon:faFilter, value:'Filtrer'}
        break;
    case ButtonTypeEnum.DELETE:
        props = {...props, icon:faXmark, value:'Supprimer', sizeIcon:null}
        break;
    case ButtonTypeEnum.COPY:
        props = {...props, icon:faCopy, value:'Copier',size:null}
        break;
    case ButtonTypeEnum.MODIFY:
        props = {...props, icon:faPen, tooltip:'bg-brick-300', value:'Modifier', variant:'outlined', text:'text-brick-300', border:'border-brick-300'}
        break;
    case ButtonTypeEnum.VIEW:
        props = {...props, icon:faEye, tooltip:'bg-brick-300', value:'Voir', variant:'outlined', text:'text-brick-300', border:'border-brick-300'}
        break;
    case ButtonTypeEnum.REFRESH:
        props = {...props, icon:faRotateRight, size:null}
        break;
    case ButtonTypeEnum.MODIFY_BLACK:
        props = {...props, icon:faPen, value:'Modifier', size:null}
        break;
    case ButtonTypeEnum.VALIDATE:
        props = {...props, icon:faCheck, bg:'bg-marine-100',value:'Valider', size:null, sizeIcon:'xl'}
        break;
    case ButtonTypeEnum.QUIT:
        props = {...props, icon:faPaperPlane, value:'Quitter'}
        break;
    case ButtonTypeEnum.SAVE:
        props = {...props, icon:faPaperPlane, value:'Enregistrer'}
        break;
}
    const renderIconButton = () => (
        <button className={`${props.bg} ${props.text} ${props.border}`} type={props.type}  onClick={props.onClick}>
            <FontAwesomeIcon icon={props.icon} size={props.sizeIcon}/>
        </button>
    )

  return(
    renderIconButton()
  )
}

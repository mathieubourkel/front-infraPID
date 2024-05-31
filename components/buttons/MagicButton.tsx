import { ButtonTypeEnum } from '@/services/enums/button.type'
import { faArrowRight, faFloppyDisk, faFolderOpen, faFolderPlus, faHandHoldingHand, faList, faPaperPlane, faPen, faRightToBracket, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    type: ButtonTypeEnum,
    handleClick?: any
    wrap?:string
    value?:string
    reverse?:boolean
}

export default function MagicButton({type, handleClick, wrap, value, reverse}:Props) {

    let props:any = {icon: null, value:'', className:null, type:"submit", 
    onClick:null, wrapSpan:null, tooltip:null, color:null}

    if (handleClick) props = {...props, type:null, onClick:handleClick}

    if (wrap) props = {...props, wrapSpan:`hidden ${wrap}:inline`, tooltip:`${wrap}:hidden`}

    switch (type) {
        case ButtonTypeEnum.ADD:
            props = {...props, icon:faFolderPlus, value:'Ajouter', color:'bg-brick-300'}
            break;
        case ButtonTypeEnum.SEND:
            props = {...props, icon:faPaperPlane, value:'Envoyer', color:'bg-brick-400'}
            break;
        case ButtonTypeEnum.CREATE:
            props = {...props, icon:faFolderPlus, value:'Créer', color:'bg-brick-300'}
            break;
        case ButtonTypeEnum.DELETE:
            props = {...props, icon:faXmark, value:'Supprimer', className:'bg-marine-100 h-full hover:bg-marine-300'}
            break;
        case ButtonTypeEnum.MODIFY:
            props = {...props, icon:faPen, value:'Modifier', className:'bg-brick-300 flex items-center'}
            break;
        case ButtonTypeEnum.REJOIN:
            props = {...props, icon:faHandHoldingHand, value:'Rejoindre', tooltip:"bg-marine-300"}
            break;
        case ButtonTypeEnum.PARAMETERS:
            props = {...props, icon:faList, value:'paramètres', className:'text-light-100 bg-marine-300 flex items-center'}
            break;
        case ButtonTypeEnum.OPEN:
            props = {...props, icon:faFolderOpen, value:'Ouvrir'}
            break;
        case ButtonTypeEnum.QUIT:
            props = {...props, icon:faPaperPlane, value:'Quitter'}
            break;
        case ButtonTypeEnum.SAVE:
            props = {...props, icon:faFloppyDisk, value:'Enregistrer', color:"bg-brick-400"}
            break;
        case ButtonTypeEnum.ACCESS:
            props = {...props, icon:faArrowRight, variant:'outlined', value:'Accéder', className:"text-brick-300 border-brick-300 flex items-center"}
            break;
        case ButtonTypeEnum.SIGNIN:
            props = {...props, icon:faRightToBracket, value:'Se connecter', className:"bg-brick-400"}
            break;
        case ButtonTypeEnum.CONNEXION:
            props = {...props, icon:faRightToBracket, value:'Connexion', color:"bg-brick-400"}
            break;
        case ButtonTypeEnum.BRICK_300:
            props = {...props, color:"bg-brick-300"}
            break;
        case ButtonTypeEnum.MARINE_300:
            props = {...props, color:"bg-marine-300"}
            break;
        case ButtonTypeEnum.MEMBERS:
            props = {...props, icon:faUser, variant:'outlined', value:'Participants', className:"flex text-marine-300 border-marine-300"}
            break;
        case ButtonTypeEnum.DOCUMENTS:
            props = {...props, icon:faFolderOpen, value:'Documents', className:"bg-brick-300 flex"}
            break;
        case ButtonTypeEnum.PURCHASES:
            props = {...props, icon:faRightToBracket,variant:'outlined', value:'Achats', color:"flex text-brick-300 border-brick-300"}
            break;
        case ButtonTypeEnum.MAIL_USER:
            props = {...props, color:"bg-marine-300 disabled:opacity-100"}
            break;
    }

    if (value) props = {...props, value}

    const renderButton = () => (
        <button className={`${props.className} ${props.color}`} type={props.type} onClick={props.onClick}>
            {renderIcon()}
            {renderText()}
        </button>
    )

    const renderReverseButton = () => (
        <button className={`${props.className} ${props.color}`} type={props.type}  onClick={props.onClick}>
            {renderText()}
            {renderIcon()}
        </button>
    )

    const renderIcon = () => (
        <FontAwesomeIcon icon={props.icon} className={"text-sm"}/>
    )

    const renderText = () => (
        <span className={`px-2 ${props.wrapSpan} whitespace-nowrap`}>{props.value}</span>
    )


    if (reverse) return (
        renderReverseButton()
    )

    return (
        renderButton()
    )
}

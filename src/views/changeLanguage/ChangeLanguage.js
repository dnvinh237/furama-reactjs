import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateLanguage } from "../../store/actions/appAction"
import BootstrapSwitchButton from "bootstrap-switch-button-react"

const ChangeLanguage = () => {

    const dispatch = useDispatch()
    const languageInit = useSelector(state => state.language);
    const [language, setLanguage] = useState(languageInit)

    const handleChangeLanguage = () => {
        if (language === 'en') {
            setLanguage('vi')
            dispatch(updateLanguage('vi'))
        } else if (language === 'vi') {
            setLanguage('en')
            dispatch(updateLanguage('en'))
        }

    }
    return (<>
        <BootstrapSwitchButton
            checked={language === 'vi'}
            onlabel='VI'
            offlabel='EN'
            onChange={handleChangeLanguage}
        />

    </>)
}

export default ChangeLanguage;
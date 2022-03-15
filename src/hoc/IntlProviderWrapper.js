import { useSelector } from 'react-redux';
import LanguageUtils from '../utils/LanguageUtils';
import { IntlProvider } from "react-intl";

const messages = LanguageUtils.getFlattenedMessages();

const IntlProviderWrapper = (props) => {
    const { children } = props
    const language = useSelector(state => state.language);
    return (
        <IntlProvider
            locale={language}
            messages={messages[language]}
            defaultLocale="vi">
            {children}
        </IntlProvider>
    );

}

export default IntlProviderWrapper
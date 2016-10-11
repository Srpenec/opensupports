import React              from 'react';
import { connect }        from 'react-redux'

import i18n               from 'lib-app/i18n';
import ConfigActions      from 'actions/config-actions';

import LanguageSelector   from 'app-components/language-selector';
import Button             from 'core-components/button';

class MainLayoutHeader extends React.Component {

    render() {
        return (
            <div className="main-layout-header">
                {this.renderAccessLinks()}
                <LanguageSelector {...this.getLanguageSelectorProps()} />
            </div>
        );
    }
    
    renderAccessLinks() {
        let result;
        
        if (this.props.session.logged) {
            result = (
                <div className="main-layout-header__login-links">
                    {i18n('WELCOME')}, 
                    <span className="main-layout-header__user-name"> {this.props.session.userName}</span>
                </div>
            );
        } else {
            result = (
                <div className="main-layout-header__login-links">
                    <Button type="clean" route={{to:'/'}}>{i18n('LOG_IN')}</Button>
                    <Button type="clean" route={{to:'/signup'}}>{i18n('SIGN_UP')}</Button>
                </div>
            );
        }

        return result;
    }

    getLanguageSelectorProps() {
        return {
            className: 'main-layout-header__languages',
            language: this.props.config.language,
            onChange: this.changeLanguage.bind(this)
        };
    }

    changeLanguage(language) {
        this.props.dispatch(ConfigActions.changeLanguage(language));
    }
}

export default connect((store) => {
    return {
        session: store.session,
        config: store.config
    };
})(MainLayoutHeader);

import { staticDefault } from 'app/default/static';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg'
import SvgFile from 'app/ui/molecules/svg-file'
import { Text } from 'app/design/typography'

const Logo = ({ mode = 'adaptive', colorMode = 'auto' }) => {
    return (
        <div
            dangerouslySetInnerHTML={
                { __html: `{{ logo }}` }
            }
        />  
    );
}

const SplashTextComponent = (props) => {
    return (
        <div
            dangerouslySetInnerHTML={
                { __html: `{{ splash_text_component }}` }
            }
        />
    );
}

const JoinTextComponent = (props) => {
    return (
        <div
            dangerouslySetInnerHTML={
                { __html: `{{ join_text_component }}` }
            }
        />
    );
}

{% if logo %}
staticDefault.logo = Logo
{% endif %}
{% if splash_text_component %}
staticDefault.splash_text = SplashTextComponent
{% endif %}
{% if join_text_component %}
staticDefault.join_text = JoinTextComponent
{% endif %}

export const staticComponents = staticDefault;
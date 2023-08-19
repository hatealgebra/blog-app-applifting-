import '@fontsource/montserrat/variable.css';
import { createGlobalStyle } from 'styled-components';
import Theme from './Theme';

const GlobalStyle = createGlobalStyle`
 * {
    box-sizing: border-box;
 }
 html { font-size: 16px; height: 100%; width: 100%;}
body{
    height: 100%; width: 100%;
    font-family: ${Theme.fonts.mainFont};
    font-size: 100%;

    ${Theme.breakpoint.laptop}{
        font-size: 105%;
    }
 
}

h1{
    font-size: ${Theme.typography.size.h1};
}
h2{
    font-size: ${Theme.typography.size.h2};
}
h3{
    font-weight: 500;
    font-size: ${Theme.typography.size.h3};
}
h4{
    font-size: ${Theme.typography.size.h4};
}
h5{
    font-size: ${Theme.typography.size.h5};
}
.label {
    font-size: ${Theme.typography.size.label};
    color: ${Theme.color.secondary};
}

.error {
    font-size: ${Theme.typography.size.label};
    color: ${Theme.color.warning};
}

p{
    color: ${Theme.color.black};
    font-size: ${Theme.typography.size.body};
    font-weight: ${Theme.typography.weight.light}
}
input, textarea {
    font-family: ${Theme.fonts.mainFont};
}
`;

export default GlobalStyle;

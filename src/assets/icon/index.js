import { Canlendar } from "./component/Canlendar";
import { Check } from "./component/Check";
import { Phone } from "./component/Phone"
import { Search } from "./component/Search";
import { Warning } from "./component/Warning";
import { Star } from "./component/Star";
import { Building } from "./component/Building";
import { More } from "./component/More";
import { Location } from "./component/Location";
import { Bank } from "./component/Bank";
import { BookMark } from "./component/BookMark";
import { Tag } from "./component/Tag";
import { Chat } from "./component/Chat";
import { Top } from "./component/Top";
import { Logout } from "./component/Logout";
import { ServiceIcon } from "./component/ServiceIcon";
import { Paper } from "./component/Paper";
import { Like } from "./component/Like";
import { Reply } from "./component/Reply";
import { Bath } from "./component/Bath";
import { Bed } from "./component/Bed";
import { People } from "./component/People";
import { Key } from "./component/Key";
import { Swatch } from "./component/Swatch";
import { Clock } from "./component/Clock";
import { Card } from "./component/Card";
import { Money } from "./component/Money";
import { Mail } from "./component/Mail";
import { Facebook } from "./component/Facebook";
import { Instagram } from "./component/Instagram";
import { Twitter } from "./component/Twitter";
import { User } from "./component/User";
import { Lock } from "./component/Lock";
import { LockOpen } from "./component/LockOpen";
import { Chart } from "./component/Chart";
import Heart from "./component/Heart";
import Cart from "./component/Cart";
import Right from "./component/Right";
import Bar from "./component/Bar";
import Eye from "./component/Eye";
import Setting from "./component/Setting";
import Trash from "./component/Trash";
import Edit from "./component/Edit";

export const Icon = (props) => {
    switch (props.name) {
        case "phone": return (<Phone {...props} />);

        case "calendar": return (<Canlendar {...props} />);

        case "check": return (<Check {...props} />);

        case "warning": return (<Warning {...props} />);

        case "search": return (<Search {...props} />);

        case "star": return (<Star {...props} />);

        case "building": return (<Building {...props} />);

        case "more": return (<More {...props} />);

        case "location": return (<Location {...props} />);

        case "bank": return (<Bank {...props} />);

        case "bookMark": return (<BookMark {...props} />);

        case "tag": return (<Tag {...props} />);

        case "chat": return (<Chat {...props} />);

        case "top": return (<Top {...props} />);

        case "logOut": return (<Logout {...props} />);

        case "service": return (<ServiceIcon {...props} />);

        case "paper": return (<Paper {...props} />);

        case "like": return (<Like {...props} />);

        case "reply": return (<Reply {...props} />);

        case "bath": return (<Bath {...props} />);

        case "bed": return (<Bed {...props} />);

        case "people": return (<People {...props} />);

        case "key": return (<Key {...props} />);

        case "swatch": return (<Swatch {...props} />);

        case "clock": return (<Clock {...props} />);
        case "card": return (<Card {...props} />);
        case "money": return (<Money {...props} />);
        case "mail": return (<Mail {...props} />);
        case "facebook": return (<Facebook {...props} />);
        case "instagram": return (<Instagram {...props} />);
        case "twitter": return (<Twitter {...props} />);
        case "user": return (<User {...props} />);
        case "lock": return (<Lock {...props} />);
        case "unlock": return (<LockOpen {...props} />);
        case "chart": return (<Chart {...props} />);
        case "heart": return (<Heart {...props} />);
        case "cart": return (<Cart {...props} />);
        case "right": return (<Right {...props} />);
        case "bar": return (<Bar {...props} />);
        case "eye": return (<Eye {...props} />);
        case "setting": return (<Setting {...props} />);
        case "trash": return (<Trash {...props} />)
        case "edit": return (<Edit {...props} />)
        default: return <></>;
    }
}

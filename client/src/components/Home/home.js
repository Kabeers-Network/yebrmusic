import React from "react";
import {AccountContext, isTvContext, PlayContext} from "../../Contexts";
import {comLinkWorker as comlinkWorker} from "../../functions/Worker/worker-export";
import endPoints from "../../api/EndPoints/EndPoints";
import Grow from "@material-ui/core/Grow";
import Chip from "@material-ui/core/Chip";
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import {Done} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SongCard from "../SongCard/SongCard";
import Preloader from "../Preloader/Preloader";
import {get, set} from "idb-keyval";
import {storageIndex} from "../../functions/Helper/StorageIndex";
import Divider from "@material-ui/core/Divider";
import Discover from "../Discover/Discover";
import Paper from "@material-ui/core/Paper";
import {useNetwork} from "../../Hooks";


const ArtistsSlider = () => {
    const [state, setState] = React.useState(null);
    const {token} = React.useContext(AccountContext);
    React.useEffect(() => {
        if (token) comlinkWorker.fetch(endPoints.getFeedArtists, {
            headers: {Authorization: `Bearer ${token}`},
        }).then(setState);
    }, [token]);
    return (
        <Paper className={"mb-3"} hidden={!state}>
            {state && state.items ?
                <div className={`cardSlider text-left Slider d-block py-2`} style={{
                    backgroundColor: "transparent",
                    borderLeft: 0,
                    borderRadius: 0,
                    borderRight: 0
                }}>
                    {state.items.map((artist, index) =>
                        <Grow in={true} key={index}>
                            <Chip
                                component={Link}
                                to={"/artist/" + artist.id}
                                avatar={<Avatar>{artist.name.charAt(0)}</Avatar>}
                                label={artist.name}
                                clickable
                                className={"mx-1"}
                                deleteIcon={<Done/>}
                            />
                        </Grow>)
                    }
                </div> : null}
        </Paper>
    )
}
export const FeedSection = ({response, showTitle = true}) => {
    const {PlaySong} = React.useContext(PlayContext);
    return (
        <React.Fragment>
            {response && response?.items.length ?
                <React.Fragment>
                    <Grow in={true}>
                        <Typography hidden={!showTitle} variant={"h5"} className={"pl-3 text-left text-truncate"}>
                            {response.title}
                        </Typography>
                    </Grow>
                    <Container maxWidth="xl" className={"px-0 mx-0 mb-0 pb-0"}>
                        <div className={"cardSlider Slider"}>
                            {response.items.map((video, index) => <SongCard key={index}
                                                                            song={video}
                                                                            onClick={() => PlaySong({
                                                                                useProxy: true,
                                                                                song: video,
                                                                                playList: {
                                                                                    list: response,
                                                                                    index: index
                                                                                }
                                                                            })}/>
                            )}
                        </div>
                    </Container>
                </React.Fragment> : null}
        </React.Fragment>
    );
};
const ErrorComponent = (error) => (
    <div hidden={error} className="Preloader text-center" style={{
        width: "10rem",
        height: "10rem",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }}>
        <img src={"./assets/icons/darkmode_nothingfound.svg"}
             style={{width: "8rem", height: "auto"}}
             alt={"Kabeers Music Logo"}/>

    </div>
);
const getTopArtistFromAPI = (e) => fetch(endPoints.Recommendations.topArtist, {
    headers: ({Authorization: `Bearer ${e}`})
}).then(a => a.status === 200 ? a.json() : null);
const getSearchFeedFromAPI = (e) => fetch(endPoints.Recommendations.topSearched, {
    headers: ({Authorization: `Bearer ${e}`})
}).then(a => a.status === 200 ? a.json() : null);

const HomeComponent = () => {
    const tv = React.useContext(isTvContext);
    const [state, setState] = React.useState([]);
    const [error, setError] = React.useState(false);
    const {token} = React.useContext(AccountContext);
    const online = useNetwork();

    const loadSections = async (t) => {
        try {
            getTopArtistFromAPI(t).then(response => setState(state => [...state, response]));
            getSearchFeedFromAPI(t).then(response => setState(state => [...state, response]));
        } catch (e) {
            setError(!error);
            console.log(e);
        }
    }
    const init = async () => {
        if (localStorage.getItem(storageIndex.litemode) && !JSON.parse(localStorage.getItem(storageIndex.litemode))) return await loadSections(token);
        if (!await get(storageIndex.home.saveObject) || !(Date.now() - await get(storageIndex.home.timeObject)) / (100 * 60) > 1) return await loadSections(token);
        else {
            const homeObject = await get(storageIndex.home.saveObject);
            return setState(homeObject); // SetState From IndexedDB
        }
    }

    const saveState = async () => {
        if (state && state.length) {
            await set(storageIndex.home.timeObject, Date.now());
            await set(storageIndex.home.saveObject, state);
        }
    };
    React.useEffect(() => {
        saveState();
    }, [state]);
    React.useEffect(() => {
        init();
    }, []);

    return (
        <div className="home mb-5" style={{minHeight: "70vh"}}>
            <div style={{marginTop: tv ? "1rem" : "5rem"}}>
                <ArtistsSlider/>
            </div>

            {(state && state.length) ? (
                state.map((response, index) => <FeedSection key={index} response={response}/>)
            ) : !error ? <Preloader/> : null}

            <div className={"mb-3"}>
                {!error ?
                    <div hidden={!online || error}>
                        <Divider/>
                        <React.Fragment>
                            <Grow in={true}>
                                <Typography variant={"h5"} className={"mb-3 mt-2 pl-3 text-left text-truncate"}>
                                    Explore
                                </Typography>
                            </Grow>
                            <Discover embedded={true} items={8}/>
                        </React.Fragment>
                    </div> : null
                }
            </div>
            <ErrorComponent error={error}/>
            <ErrorComponent error={!online}/>
        </div>
    )
}
export default React.memo(HomeComponent);

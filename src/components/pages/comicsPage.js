import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import { Outlet } from "react-router-dom";
import {Helmet} from "react-helmet";
import { useEffect } from "react";

const ComicsPage = () => {

    return (
        <>
            <Helmet>
                <title>Marvel comics</title>
                <meta
                    name='description'
                    content="Awesome comics with marvel chars" 
                />
            </Helmet>
            <AppBanner/>
            <Outlet/>
        </>
    )
}


export default ComicsPage
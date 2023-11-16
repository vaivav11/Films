import React, {useEffect, useState, useCallback} from "react";
import { Tabs, Layout, Row, Col, Imput, message } from "antd";
import './FilmList.css';
import FilmTab from "./FilmTab";
import FilmForm from "./FilmForm";
import { createFilm, deleteFilm, loadFilm, updateFilm } from '../services/filmService';
const {TabPane} = Tabs;
const {Content} = Layout;

const FilmList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [films, setfilms] = useState([]);
    const [setFilms, setActiveFilms] = useState([]);
    const [completedFilms, setCompletedFilms] = useState([]);

    const handleFormSubmit = (film) => {
        console.log('Pridėti filmą', film);
        createFilm(film).then(onRefresh());
        message.success('Filmas pridėtas');
    }

    const handleRemoveFilm = (film) => {
        deleteFilm(film.id).then(onRefresh());
        message.console.warn('Filmas pašalintas');
    }

    const handdleToggleFilmStatus = (film) => {
        film.completed = !film.completed;
        updateFilm(film).then(onRefresh());
        message.info('Pakeistas filmo statusas')
    }

    const refresh = () => {
        loadFilm().then(json => {
            setfilms(json);
            setActiveFilms(json.filter(film => film.completed === false));
            setCompletedFilms(json.filter(film => film.completed === true));
        }).then(console.log('Fetch completed'))
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        let data = await loadFilm();
        setfilms(data);
        setActiveFilms(data.filter(film => film.completed === false));
        setCompletedFilms(data.filter(film => film.completed === true));
        setRefreshing(false);
        console.log('Refresh state', refreshing);
    }, [refreshing]);

    useEffect(() => {
        refresh();
    }, [onRefresh])

    return (
        <Layout className="layout">
            <Content style={{padding: '0 50px'}}>
                <div className="filmList">
                    <Row>
                        <Col span={14} offset={5}>
                            <h1>Filmų sąrašas</h1>
                            <FilmForm onFormSubmit={handleFormSubmit}/>
                            <br/>
                            <Tabs defaultActiveKey="all">
                                <TabPane tab="all" key="all">
                                    <FilmTab films={films} onFilmToggle={handdleToggleFilmStatus} onFilmRemoval={handleRemoveFilm}/>
                                </TabPane>
                                <TabPane tab="active" key="active">
                                    <FilmTab films={setActiveFilms} onFilmToggle={handdleToggleFilmStatus} onFilmRemoval={handleRemoveFilm}/>
                                </TabPane>
                                <TabPane tab="complete" key="complete">
                                    <FilmTab films={completedFilms} onFilmToggle={handdleToggleFilmStatus} onFilmRemoval={handleRemoveFilm}/>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    )

}

export default FilmList;
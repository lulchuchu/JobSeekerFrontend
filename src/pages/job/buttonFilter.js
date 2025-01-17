import styles from "@/styles/job.module.css";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import {Input} from "antd";

export default function ButtonFilter({ companyId, changeFilter , changeResult, setCurrPage}) {
    const [dateButtonToogle, setDateButtonToogle] = useState(false);
    const [experienceButtonToogle, setExperienceButtonToogle] = useState(false);
    const [jobTypeButtonToogle, setJobTypeButtonToogle] = useState(false);
    const [onSiteButtonToogle, setOnSiteButtonToogle] = useState(false);

    const [radioDate, setRadioDate] = useState(null);
    const [radioExperience, setRadioExperience] = useState(null);
    const [radioJobType, setRadioJobType] = useState(null);
    const [radioOnSite, setRadioOnSite] = useState(null);

    const [currentDate, setCurrentDate] = useState(null);
    const [currentExperience, setCurrentExperience] = useState(null);
    const [currentJobType, setCurrentJobType] = useState(null);
    const [currentOnSite, setCurrentOnSite] = useState(null);
    const [query, setQuery] = useState("");
    const { Search } = Input;

    function handleDateButtonToogle() {
        setDateButtonToogle(!dateButtonToogle);
        setExperienceButtonToogle(false);
        setJobTypeButtonToogle(false);
        setOnSiteButtonToogle(false);
    }

    function handleExperienceButtonToogle() {
        setExperienceButtonToogle(!experienceButtonToogle);
        setDateButtonToogle(false);
        setJobTypeButtonToogle(false);
        setOnSiteButtonToogle(false);
    }

    function handleJobTypeButtonToogle() {
        setJobTypeButtonToogle(!jobTypeButtonToogle);
        setDateButtonToogle(false);
        setExperienceButtonToogle(false);
        setOnSiteButtonToogle(false);
    }

    function handleOnSiteButtonToogle() {
        setOnSiteButtonToogle(!onSiteButtonToogle);
        setDateButtonToogle(false);
        setExperienceButtonToogle(false);
        setJobTypeButtonToogle(false);
    }

    function handleDateChangeRadio(e) {
        setCurrentDate(e.target.value);
    }

    function handleExperienceChangeRadio(e) {
        setCurrentExperience(e.target.value);
    }

    function handleJobTypeChangeRadio(e) {
        setCurrentJobType(e.target.value);
    }

    function handleOnSiteChangeRadio(e) {
        setCurrentOnSite(e.target.value);
    }

    function handleSubmitButton() {
        const data = {
            companyId: companyId,
            date: currentDate,
            experience: currentExperience,
            jobType: currentJobType,
            onSite: currentOnSite,
            currPage: 0,
            numberPerPage: 10,
            query: query
        };

        changeFilter(data);
        changeResult(null);
        setCurrPage(0)
    }

    function onSearch(value) {
        setQuery(value);
        const data = {
            companyId: companyId,
            date: currentDate,
            experience: currentExperience,
            jobType: currentJobType,
            onSite: currentOnSite,
            currPage: 0,
            numberPerPage: 10,
            query: value
        };

        changeFilter(data);
        changeResult(null);
        setCurrPage(1)
    }

    return (
        <>
            <div className={styles.searchJob}>
                <Search placeholder="Search job by title, company or address" onSearch={onSearch} enterButton />
            </div>
            <div className={styles.buttonList}>
                <div>
                    <button
                        className={styles.button}
                        onClick={handleDateButtonToogle}>
                        <p className={styles.textButton}>Date posted</p>
                    </button>
                    {dateButtonToogle && (
                        <div className={styles.filterButton}>
                            <ul
                                className={styles.list}
                                onChange={handleDateChangeRadio}>
                                <li className={styles.listItem}>
                                    <input
                                        type="radio"
                                        value="1 day"
                                        checked={currentDate === "1 day"}
                                    />
                                    Last 24 hours
                                </li>
                                <li className={styles.listItem}>
                                    <input
                                        type="radio"
                                        value="Last week"
                                        checked={currentDate === "Last week"}
                                    />
                                    Last week
                                </li>
                                <li className={styles.listItem}>
                                    <input
                                        type="radio"
                                        value="Last month"
                                        checked={currentDate === "Last month"}
                                    />
                                    Last month
                                </li>
                                <li className={styles.listItem}>
                                    <input
                                        type="radio"
                                        value="Any time"
                                        checked={currentDate === "Any time"}
                                    />
                                    Any time
                                </li>
                            </ul>
                            <button
                                className={styles.clearButton}
                                onClick={() => {
                                    setCurrentDate(null);
                                }}>
                                Clear
                            </button>
                            <button
                                className={styles.submitButton}
                                onClick={handleSubmitButton}>
                                Show results
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <button
                        className={styles.button}
                        onClick={handleExperienceButtonToogle}>
                        <p className={styles.textButton}>Experience level</p>
                    </button>
                    {experienceButtonToogle && (
                        <div className={styles.filterButton}>
                            <ul
                                className={styles.list}
                                onChange={handleExperienceChangeRadio}>
                                <li className={styles.listItem}>
                                    <input
                                        type="radio"
                                        value="Internship"
                                        checked={currentExperience === "Internship"}
                                    />
                                    Internship
                                </li>
                                <li className={styles.listItem}>
                                    <input
                                        type="radio"
                                        value="Entry level"
                                        checked={
                                            currentExperience === "Entry level"
                                        }
                                    />
                                    Entry level
                                </li>
                                <li className={styles.listItem}>
                                    <input
                                        type="radio"
                                        value="Mid level"
                                        checked={currentExperience === "Mid level"}
                                    />
                                    Mid level
                                </li>
                                <li className={styles.listItem}>
                                    <input
                                        type="radio"
                                        value="Senior level"
                                        checked={
                                            currentExperience === "Senior level"
                                        }
                                    />
                                    Senior level
                                </li>
                            </ul>
                            <button
                                className={styles.clearButton}
                                onClick={() => {
                                    setCurrentExperience(null);
                                }}>
                                Clear
                            </button>

                            <button
                                className={styles.submitButton}
                                onClick={handleSubmitButton}>
                                Show results
                            </button>
                        </div>
                    )}
                </div>
                <div>
                    <button
                        className={styles.button}
                        onClick={handleJobTypeButtonToogle}>
                        <p className={styles.textButton}>Job type</p>
                    </button>
                    {jobTypeButtonToogle && (
                        <div className={styles.filterButton}>
                            <ul
                                className={styles.list}
                                onChange={handleJobTypeChangeRadio}>
                                <li className={styles.listItem}>
                                    <input
                                        type="radio"
                                        value="Full-time"
                                        checked={currentJobType === "Full-time"}
                                    />
                                    Full time
                                </li>
                                <li className={styles.listItem}>
                                    <input
                                        type="radio"
                                        value="Contract"
                                        checked={currentJobType === "Contract"}
                                    />
                                    Contract
                                </li>
                                <li className={styles.listItem}>
                                    <input
                                        type="radio"
                                        value="Internship"
                                        checked={currentJobType === "Internship"}
                                    />
                                    Internship
                                </li>
                            </ul>
                            <button
                                className={styles.clearButton}
                                onClick={() => {
                                    setCurrentJobType(null);
                                }}>
                                Clear
                            </button>

                            <button
                                className={styles.submitButton}
                                onClick={handleSubmitButton}>
                                Show results
                            </button>
                        </div>
                    )}
                </div>
                <div>
                    <button
                        className={styles.button}
                        onClick={handleOnSiteButtonToogle}>
                        <p className={styles.textButton}>On-site/remote</p>
                    </button>
                    {onSiteButtonToogle && (
                        <div className={styles.filterButton}>
                            <ul
                                className={styles.list}
                                onChange={handleOnSiteChangeRadio}>
                                <li className={styles.listItem}>
                                    <input
                                        type="radio"
                                        value="On-site"
                                        checked={currentOnSite === "On-site"}
                                    />
                                    On-site
                                </li>
                                <li className={styles.listItem}>
                                    <input
                                        type="radio"
                                        value="Remote"
                                        checked={currentOnSite === "Remote"}
                                    />
                                    Remote
                                </li>
                                <li className={styles.listItem}>
                                    <input
                                        type="radio"
                                        value="Hybrid"
                                        checked={currentOnSite === "Hybrid"}
                                    />
                                    Hybrid
                                </li>
                            </ul>
                            <button
                                className={styles.clearButton}
                                onClick={() => {
                                    setCurrentOnSite(null);
                                }}>
                                Clear
                            </button>
                            <button
                                className={styles.submitButton}
                                onClick={handleSubmitButton}>
                                Show results
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>

    );
}

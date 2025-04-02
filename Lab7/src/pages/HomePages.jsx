import React, {Component} from 'react';
import HeaderComponent from "../components/sections/HeaderComponent.jsx";
import SkillsComponent from "../components/sections/SkillsComponent.jsx";
import EducationComponent from "../components/sections/EducationComponent.jsx";
import AboutMeComponent from "../components/sections/AboutMeComponent.jsx";
import ExperienceComponent from "../components/sections/ExperienceComponent.jsx";

class HomePage extends Component {
    render() {
        return (
            <main>
                <section
                    className="p-10 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <HeaderComponent/>
                    <SkillsComponent/>
                    <EducationComponent/>
                    <ExperienceComponent/>
                    <AboutMeComponent/>
                </section>
            </main>
        );
    }
}

export default HomePage;
import scaffoldIcon from './essay.svg';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

const demonstrationWords = [
        "shows",
        "demonstrates",
        "supports",
        "documents",
        "identifies",
        "communicates",
        "illustrates"
];

const getDemonstrationWord = () => {
        return demonstrationWords[Math.floor(Math.random() * demonstrationWords.length)];
}

const replaceValue = (haystack, needle, replacement) => {
        return haystack.replaceAll(`{${needle}}`, replacement)
}

const scaffolds = {
        goal: "This piece of evidence {demonstrates} my progress towards my goal because...",
        growthDomain: "This piece of evidence {demonstrates} my progress in the \"{domain}\" Growth Domain, because ...",
        deepLearningSkill: "This piece of evidence {demonstrates} my progress in the \"{skill}\" Deep Learning Skill, because ...",
        develop: "To develop and growth further, I could ..."
};

export default class ScaffoldEvidence extends Plugin {
        init() {
                const editor = this.editor;

                editor.ui.componentFactory.add('scaffoldEvidence', locale => {
                        const view = new ButtonView(locale);

                        view.set({
                                label: 'Scaffold Evidence',
                                icon: scaffoldIcon,
                                tooltip: true
                        });

                        view.on('execute', () => {
                                editor.model.change(writer => {
                                        const docFragment = writer.createDocumentFragment();
                                        let elementsQueue = [];

                                        let goalText = replaceValue(scaffolds.goal, 'demonstrates', getDemonstrationWord());

                                        let goalElement = writer.createElement('paragraph');
                                        writer.append(goalElement, docFragment);
                                        writer.insertText(goalText, goalElement);

                                        if (editor.denGrowthDomains && editor.denGrowthDomains.length !== 0) {
                                                for (let growthDomain of editor.denGrowthDomains) {
                                                        let growthDomainText = replaceValue(scaffolds.growthDomain, "demonstrates", getDemonstrationWord());
                                                        growthDomainText = replaceValue(growthDomainText, "domain", growthDomain);

                                                        let el = writer.createElement('paragraph');
                                                        writer.append(el, docFragment);
                                                        writer.insertText(growthDomainText, el);
                                                }
                                        } else {
                                                let growthDomainText = replaceValue(scaffolds.growthDomain, "demonstrates", getDemonstrationWord());
                                                growthDomainText = replaceValue(growthDomainText, 'domain', "...");

                                                let el = writer.createElement('paragraph');
                                                writer.append(el, docFragment);
                                                writer.insertText(growthDomainText, el);
                                        }

                                        if (editor.denDeepLearningSkills && editor.denDeepLearningSkills.length !== 0) {
                                                for (let deepLearningSkill of editor.denDeepLearningSkills) {
                                                        let deepLearningText = replaceValue(scaffolds.deepLearningSkill, "demonstrates", getDemonstrationWord());
                                                        deepLearningText = replaceValue(deepLearningText, "skill", deepLearningSkill);

                                                        let el = writer.createElement('paragraph');
                                                        writer.append(el, docFragment);
                                                        writer.insertText(deepLearningText, el);
                                                }
                                        } else {
                                                let deepLearningText = replaceValue(scaffolds.deepLearningSkill, "demonstrates", getDemonstrationWord());
                                                deepLearningText = replaceValue(deepLearningText, 'skill', "...");

                                                let el = writer.createElement('paragraph');
                                                writer.append(el, docFragment);
                                                writer.insertText(deepLearningText, el);
                                        }

                                        let developElement = writer.createElement('paragraph');
                                        writer.append(developElement, docFragment);
                                        writer.insertText(scaffolds.develop, developElement);

                                        editor.model.insertContent(docFragment, editor.model.document.selection);
                                } );
                        } );

                        return view;
                });
        }
}

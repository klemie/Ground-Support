import { DocumentationProps } from "../components/ComponentDocumentation";
import Header from "../components/Header";

const header = <Header breadCrumbs={[{ name: "breadCrumb", path: "/", active: false }]}/>;

const codeBlocks = [
`import { Breadcrumb } from "../components/Header"; 
const crumbs: breadCrumbs[] = [
    { name: "New Mission", active: false },
    { name: "Standby", active: false }
];
  
return (
    <Header breadCrumbs={crumbs} />
);`,
`import Module, { Field } from "../components/Module"; 

// Gotten from data configuration
const fields: Field[] = [
    { name: "New Mission", active: false },
    { name: "Standby", active: false }
];

const value = useState<DataPoint>();
  
return (
    <Module 
        Name='Module Title'
        Visualize={ false }
        Fields={ fields }
    />
);`
];

export const components: DocumentationProps[] = [
    {
		Name: 'Header',
		Description: 'The header holds the app logo, name and breadcrumbs.',
		Component: header,
		ComponentProps: [
			{ Name: 'breadCrumbs', Description: 'N/a', Type: 'object', Required: true },
            { Name: 'BreadCrumb.name', Description: 'N/a', Type: 'string', Required: true },
            { Name: 'BreadCrumb.path', Description: 'N/a', Type: 'string', Required: false },
            { Name: 'BreadCrumb.active', Description: 'N/a', Type: 'boolean', Required: true }
		],
		UseCase: codeBlocks[0]
    }
];


import { DocumentationProps } from "../components/ComponentDocumentation";
import Header from "../components/Header";
import Module, { Field } from "../components/Module";
import RealTimeChart from "../components/Graph";

const header = <Header breadCrumbs={[{ name: "breadCrumb", path: "/", active: false }]}/>;
const module = <Module visualize={true} title="Module Demo" fields={[{ module: "Module Demo", fieldName: 'Field 1', fieldRange: [0,2], fieldValue: 3 } ]} />;
const graph = <RealTimeChart />;

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
    },
    {
      	Name: 'Module',
        Description: 'The header holds the app logo, name and breadcrumbs.',
        Component: module,
        ComponentProps: [
            { Name: 'Title', Description: 'Name of the Module will appear in the header section', Type: 'string', Required: true },
            { Name: 'Fields', Description: 'Names of the fields in a list', Type: '[Fields]', Required: true },
            { Name: 'Visualize', Description: 'Show a graph of the last 20 dataPoints or a matrix of textfield\'s', Type: 'boolean', Required: true },
            { Name: 'Field.module', Description: 'Parent module of the fields', Type: 'string', Required: true },
            { Name: 'Field.fieldName', Description: 'Name of the Field', Type: 'string', Required: true },
            { Name: 'Field.fieldRange', Description: 'A maximum and minimum of acceptable values', Type: 'tuple', Required: true },
            { Name: 'Field.fieldValue', Description: 'Current dataPoint', Type: 'number', Required: true }
        ],
        UseCase: codeBlocks[1]
    }
];


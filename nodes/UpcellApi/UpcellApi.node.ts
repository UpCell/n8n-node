import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class UpcellApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'upcell API',
		name: 'upcellApi',
		icon: 'file:upcell-logo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from the upcell API',
		defaults: {
			name: 'upcell API',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'upcellApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://app.upcell.io/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Enrich Mobile',
						value: 'enrichMobile',
					},
					{
						name: 'Enrich Email',
						value: 'enrichEmail',
					},
					{
						name: 'Enrich Social URL',
						value: 'enrichSocialUrl',
					},
				],
				default: 'enrichMobile',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'enrichMobile',
						],
					},
				},
				options: [
					{
						name: 'Post',
						value: 'post',
						action: 'Enrich mobile',
						description: 'Enrich contact with mobile phone',
						routing: {
							request: {
								method: 'POST',
								url: '/enrich/contact',
								body: {
									linkedinUrl:'={{ $parameter.linkedinUrl }}',
									fields:'={{["mobile"]}}'
								},
							},
						},
					},
				],
				default: 'post',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'enrichEmail',
						],
					},
				},
				options: [
					{
						name: 'Post',
						value: 'post',
						action: 'Enrich email',
						description: 'Enrich contact with email address',
						routing: {
							request: {
								method: 'POST',
								url: '/enrich/email',
								body: {
									first_name:'={{ $parameter.firstName }}',
									last_name:'={{ $parameter.lastName }}',
									company_domain:'={{ $parameter.companyDomain }}'
								},
							},
						},
					},
				],
				default: 'post',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'enrichSocialUrl',
						],
					},
				},
				options: [
					{
						name: 'Post',
						value: 'post',
						action: 'Enrich social url',
						description: 'Enrich contact with social URL',
						routing: {
							request: {
								method: 'POST',
								url: '/enrich/socialurl',
								body: {
									first_name:'={{ $parameter.firstName }}',
									last_name: '={{ $parameter.lastName }}',
									title: '={{ $parameter.title }}',
									company_name: '={{ $parameter.companyName }}',
									company_domain: '={{ $parameter.companyDomain }}',
									company_social_url: '={{ $parameter.companySocialUrl }}',
									email: '={{ $parameter.email }}',
									mobile_phone: '={{ $parameter.mobilePhone }}'
								},
							},
						},
					},
				],
				default: 'post',
			},
			{
				displayName: 'LinkedIn URL',
				description: 'LinkedIn URL for contact to enrich',
				required: true,
				name: 'linkedinUrl',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'enrichMobile',
						],
					},
				},
			},
			{
				displayName: 'First Name',
				description: 'First name for contact to enrich',
				name: 'firstName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'enrichEmail',
						],
					},
				},
			},
			{
				displayName: 'First Name',
				description: 'First name for contact to enrich',
				name: 'firstName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'enrichSocialUrl',
						],
					},
				},
			},
			{
				displayName: 'Last Name',
				description: 'Last name for contact to enrich',
				name: 'lastName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'enrichEmail'
						],
					},
				},
			},
			{
				displayName: 'Last Name',
				description: 'Last name for contact to enrich',
				name: 'lastName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'enrichSocialUrl'
						],
					},
				},
			},
			{
				displayName: 'Company Name',
				description: 'Company name for contact to enrich',
				name: 'companyName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'enrichSocialUrl',
						],
					},
				},
			},
			{
				displayName: 'Company Domain',
				description: 'Company domain for contact to enrich',
				name: 'companyDomain',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'enrichSocialUrl'
						],
					},
				},
			},
			{
				displayName: 'Company Domain',
				description: 'Company domain for contact to enrich',
				name: 'companyDomain',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'enrichEmail'
						],
					},
				},
			},
			{
				displayName: 'Title',
				description: 'Title for contact to enrich',
				name: 'title',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'enrichSocialUrl'
						],
					},
				},
			},
			{
				displayName: 'Company Social URL',
				description: 'Company social URL for contact to enrich',
				name: 'companySocialUrl',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'enrichSocialUrl'
						],
					},
				},
			},
			{
				displayName: 'Email',
				description: 'Email for contact to enrich',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'enrichSocialUrl'
						],
					},
				},
			},
			{
				displayName: 'Mobile Phone Number',
				description: 'Mobile phone for contact to enrich',
				name: 'mobilePhone',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'enrichSocialUrl'
						],
					},
				},
			},
			// Optional/additional fields will go here
		]
	};
}

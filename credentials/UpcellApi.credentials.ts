import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UpcellApi implements ICredentialType {
	name = 'upcellApi';
	displayName = 'Upcell API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl = 'https://api.upcell.io';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{$credentials.apiKey}}'
			}
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://app.upcell.io/v1',
			url: '/enrich/contactExistence',
			method: 'POST',
			body: {
				contact: {
					linkedinUrl: "https://www.linkedin.com/in/marklbedard"
				},
				existenceFields: ["mobile"]
			}
		},
	};
}

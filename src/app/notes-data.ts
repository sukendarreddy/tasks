import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Notes } from './notes';

export class NotesData implements InMemoryDbService {

    createDb() {
        const notes: Notes[] = [
            {
                id: 1,
                title: 'Title 1',
                body: 'Infosys Limited is an Indian multinational corporation that provides business consulting,Bangalore',
                modifiedDate: '30-01-2020',
                CreatedDate: '30-01-2020',
                category: 'UI',
                color:'blue'
            },
            {
                id: 2,
                title: 'Title 2',
                body: 'Infosys Limited is an Indian multinational corporation that provides business consulting,Hyderabad',
                modifiedDate: '30-01-2020',
                CreatedDate: '30-01-2020',
                category: 'UI',
                color: 'sky-blue'
            },
            {
                id: 3,
                title: 'Title 3',
                body: 'Infosys Limited is an Indian multinational corporation that provides business consulting,Mumbai',
                modifiedDate: '30-01-2020',
                CreatedDate: '30-01-2020',
                category: 'UI',
                color: 'yellow'
            },
            {
                id: 4,
                title: 'Title 4',
                body: 'Infosys Limited is an Indian multinational corporation that provides business consulting , Pune',
                modifiedDate: '30-01-2020',
                CreatedDate: '30-01-2020',
                category: 'UI',
                color: 'grey'
            },
            {
                id: 5,
                title: 'Title 5',
                body: 'Infosys Limited is an Indian multinational corporation that provides business consulting,Orisha',
                modifiedDate: '30-01-2020',
                CreatedDate: '30-01-2020',
                category: 'UI',
                color: 'pink'
            },
            {
                id: 6,
                title: 'Title 6',
                body: 'Infosys Limited is an Indian multinational corporation that provides business consulting,Chenai',
                modifiedDate: '30-01-2020',
                CreatedDate: '30-01-2020',
                category: 'UI',
                color: 'red'
            }

            
        ];
        return { notes };
    }
}

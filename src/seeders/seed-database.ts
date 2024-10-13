import { MikroORM } from '@mikro-orm/core';
import { faker } from '@faker-js/faker';
import { Account } from '../accounts/entities/account.entity';
import { Contact } from '../contacts/entities/contact.entity';
import { Lead } from '../leads/entities/lead.entity';
import { Campaign } from '../campaigns/entities/campaign.entity';
import { Opportunity } from '../opportunities/entities/opportunity.entity';
import { Task } from '../tasks/entities/task.entity';

async function seedAccounts() {
    const orm = await MikroORM.init();
    const em = orm.em.fork();

    // Create data for the Account table
    for (let i = 0; i < 10; i++) {
        const account = new Account();
        account.name = faker.company.name();
        account.industry = faker.company.name();
        account.website = faker.internet.url();
        em.persist(account);
    }

    // Create data for the Contact table
    for (let i = 0; i < 10; i++) {
        const contact = new Contact();
        contact.firstName = faker.person.firstName();
        contact.lastName = faker.person.lastName();
        contact.email = faker.internet.email();
        contact.phone = faker.phone.number();
        contact.account = em.getReference(Account, faker.number.int({ min: 1, max: 10 }));
        em.persist(contact);
    }

    // Create data for the Campaign table
    const campaignStatuses = ['Planned', 'Active', 'Completed', 'Archived', 'Paused', 'Canceled'];

    for (let i = 0; i < 10; i++) {
        const campaign = new Campaign();
        campaign.name = faker.company.catchPhrase();
        campaign.description = faker.lorem.sentence();
        campaign.status = faker.helpers.arrayElement(campaignStatuses);
        campaign.startDate = faker.date.between({ from: new Date('2020-01-01'), to: new Date('2023-12-31') });
        campaign.endDate = faker.date.between({ from: campaign.startDate, to: new Date('2024-12-31') });
        em.persist(campaign);
    }

    // Create data for the Lead table
    const leadStatuses = ['New', 'Contacted', 'Qualified'];

    for (let i = 0; i < 10; i++) {
        const lead = new Lead();
        lead.name = faker.person.fullName();
        lead.company = faker.company.name();
        lead.email = faker.internet.email();
        lead.status = faker.helpers.arrayElement(leadStatuses);
        lead.campaign = i % 2 === 0 ? em.getReference(Campaign, faker.number.int({ min: 1, max: 5 })) : undefined;
        em.persist(lead);
    }

    // Create data for the Opportunity table
    const opportunityStages = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

    for (let i = 0; i < 10; i++) {
        const opportunity = new Opportunity();
        opportunity.name = faker.company.catchPhrase();
        opportunity.amount = faker.number.int({ min: 1000, max: 10000 });
        opportunity.stage = faker.helpers.arrayElement(opportunityStages);
        opportunity.account = em.getReference(Account, faker.number.int({ min: 1, max: 10 }));
        em.persist(opportunity);
    }

    // Create data for the Task table  
    const taskStatuses = ['New', 'In Progress', 'Completed', 'Deferred', 'Waiting on Someone Else'];

    for (let i = 0; i < 10; i++) {
        const task = new Task();
        task.title = faker.lorem.sentence();
        task.description = faker.lorem.paragraph();
        task.dueDate = faker.date.between({ from: new Date('2020-01-01'), to: new Date('2023-12-31') });
        task.status = faker.helpers.arrayElement(taskStatuses);
        task.lead = em.getReference(Lead, faker.number.int({ min: 1, max: 10 }));
        em.persist(task);
    }

    // Flush changes to the database
    await em.flush();
    console.log('Database seeded with fake data successfully!');
    await orm.close();
}

seedAccounts().catch((err) => {
    console.error('Error seeding Account data:', err);
});
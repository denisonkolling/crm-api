export enum CampaignStatus {
    PLANNED = 'Planned',           // Campanha planejada, mas ainda não iniciada
    ACTIVE = 'Active',             // Campanha em execução
    COMPLETED = 'Completed',       // Campanha finalizada com sucesso
    ARCHIVED = 'Archived',         // Campanha arquivada
    DRAFT = 'Draft',               // Campanha em rascunho, não finalizada
    CANCELLED = 'Cancelled',       // Campanha cancelada antes de começar ou durante a execução
    PAUSED = 'Paused',             // Campanha pausada temporariamente
    EXPIRED = 'Expired',           // Campanha que atingiu a data de término, mas não foi explicitamente finalizada
    FAILED = 'Failed',             // Campanha que falhou por algum motivo
    UNDER_REVIEW = 'Under Review', // Campanha aguardando aprovação/revisão
    SUSPENDED = 'Suspended',       // Campanha suspensa por algum motivo, como violação de política
    TESTING = 'Testing'            // Campanha em fase de teste ou piloto
}

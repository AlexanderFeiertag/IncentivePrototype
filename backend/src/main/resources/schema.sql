create table if not exists t_employee
(
    email               varchar(255) not null,
    address             varchar(255) not null,
    PRIMARY KEY (email)
);

create table if not exists t_nft_incentive
(
    address             varchar(255) not null,
    icon                varchar(1000) not null,
    PRIMARY KEY (address)
);

create table if not exists t_currency_incentive
(
    name                varchar(255) not null,
    description         varchar(255) not null,
    price               integer      not null,
    icon                varchar(255) not null,
    is_available        boolean      not null,
    PRIMARY KEY (name)
);

create table if not exists t_transaction
(
    id                  varchar(255) not null,
    sender_address      varchar(255) not null,
    receiver_address    varchar(255) not null,
    info                varchar(255) not null,
    timestamp           varchar(255) not null,
    type                varchar(255) not null,
    reason              varchar(500) not null,
    PRIMARY KEY (id)
);
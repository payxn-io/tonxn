import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type CdpContractConfig = {};

export function cdpContractConfigToCell(config: CdpContractConfig): Cell {
    return beginCell().endCell();
}

export class CdpContract implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new CdpContract(address);
    }

    static createFromConfig(config: CdpContractConfig, code: Cell, workchain = 0) {
        const data = cdpContractConfigToCell(config);
        const init = { code, data };
        return new CdpContract(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}

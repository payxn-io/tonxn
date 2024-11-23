import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { CdpContract } from '../wrappers/CdpContract';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('CdpContract', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('CdpContract');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let cdpContract: SandboxContract<CdpContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        cdpContract = blockchain.openContract(CdpContract.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await cdpContract.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: cdpContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and cdpContract are ready to use
    });
});

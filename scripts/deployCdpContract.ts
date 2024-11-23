import { toNano } from '@ton/core';
import { CdpContract } from '../wrappers/CdpContract';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const cdpContract = provider.open(CdpContract.createFromConfig({}, await compile('CdpContract')));

    await cdpContract.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(cdpContract.address);

    // run methods on `cdpContract`
}

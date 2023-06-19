import { Pipe, PipeTransform } from '@angular/core';
import nameHashes from '@shared/pipes/name-hashes.json';

@Pipe({
    name: 'nameHash',
    standalone: true
})
export class NameHashPipe implements PipeTransform {

    transform(input: string | number | null): string {
        const nameHash = String(input);
        if (!nameHash?.length) {
            return '';
        }

        const hashes = nameHashes as { [key: string]: string };

        if (!hashes) {
            return nameHash;
        }

        if (hashes[nameHash]) {
            return hashes[nameHash];
        }

        return nameHash;
    }

}

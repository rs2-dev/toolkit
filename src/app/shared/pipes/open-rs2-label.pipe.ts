import { Pipe, PipeTransform } from '@angular/core';
import { openRs2Labels } from '../services/open-rs2/open-rs2.model';

@Pipe({
    name: 'openRs2Label',
    standalone: true
})
export class OpenRs2LabelPipe implements PipeTransform {

    transform(value: string | null): string {
        if (!value?.length) {
            return '';
        }

        return openRs2Labels[value] || '';
    }

}

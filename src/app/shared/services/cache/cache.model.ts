export const js5IndexNames: string[] = new Array(256).fill('');

export const getJs5IndexNumber = (name: string): number =>
    js5IndexNames.indexOf(name);

js5IndexNames[255] = 'main';

js5IndexNames[0] = 'anims';
js5IndexNames[1] = 'bases';
js5IndexNames[2] = 'config';
js5IndexNames[3] = 'interfaces';
js5IndexNames[4] = 'synth_sounds';
js5IndexNames[5] = 'maps';
js5IndexNames[6] = 'midi_songs';
js5IndexNames[7] = 'models';
js5IndexNames[8] = 'sprites';
js5IndexNames[9] = 'textures';
js5IndexNames[10] = 'binary';
js5IndexNames[11] = 'midi_jingles';
js5IndexNames[12] = 'clientscripts';
js5IndexNames[13] = 'fontmetrics';
js5IndexNames[14] = 'vorbis';
js5IndexNames[15] = 'midi_instruments';
js5IndexNames[16] = 'config_loc';
js5IndexNames[17] = 'config_enum';
js5IndexNames[18] = 'config_npc';
js5IndexNames[19] = 'config_obj';
js5IndexNames[20] = 'config_seq';
js5IndexNames[21] = 'config_spot';
js5IndexNames[22] = 'config_var_bit';
js5IndexNames[23] = 'worldmapdata';
js5IndexNames[24] = 'quickchat';
js5IndexNames[25] = 'quickchat_global';
js5IndexNames[26] = 'materials';
js5IndexNames[27] = 'config_particle';
js5IndexNames[28] = 'defaults';
js5IndexNames[29] = 'billboards';

export const jagIndexNames: string[] = new Array(5).fill('');

export const getJagIndexNumber = (name: string): number =>
    jagIndexNames.indexOf(name);

jagIndexNames[0] = 'archives';
jagIndexNames[1] = 'models';
jagIndexNames[2] = 'animations';
jagIndexNames[3] = 'midi';
jagIndexNames[4] = 'maps';

export const jagArchiveNames: string[] = new Array(9).fill(null);

export const getJagArchiveNumber = (name: string): number =>
    jagArchiveNames.indexOf(name);

jagArchiveNames[1] = 'title.jag';
jagArchiveNames[2] = 'config.jag';
jagArchiveNames[3] = 'interface.jag';
jagArchiveNames[4] = 'media.jag';
jagArchiveNames[5] = 'versionlist.jag';
jagArchiveNames[6] = 'textures.jag';
jagArchiveNames[7] = 'wordenc.jag';
jagArchiveNames[8] = 'sounds.jag';
